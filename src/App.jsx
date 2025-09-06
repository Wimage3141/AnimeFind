import React, { useState, useEffect } from 'react'
import Search from './components/Search'

const App = () => {
  const URL = "https://graphql.anilist.co";
  const QUERY_DEFAULT = `
    query($page:Int = 1) {
      Page(page: $page, perPage: 20) {
        media(sort: [POPULARITY_DESC, SCORE_DESC]) {
          id
          title {
            english
            romaji
            native
          }
          genres
          popularity
          meanScore
        }
      }
    }
  `;

  const QUERY_SEARCH = `
    query ($search: String!) { # Define which variables will be used in the query (id)
      Page {
        media (search: $search, type: ANIME) {
          id
          popularity
          meanScore
          title {
            english
            native
          }
          genres
        }
      }
    }
    `;

  const [searchedTerm, setSearchedTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState("default");

  useEffect(() => {
    fetchData("default");
  }, []);

  const buildOptions = (mode) => {
    let options;
    const variables = {
      search: searchTerm
    };
    if(mode === "search") {
      console.log("mode is search, set options accordingly");
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          query: QUERY_SEARCH,
          variables: variables
        })
      };
    }
    else if(mode === "default") {
        console.log("mode is default, set options accordingly");
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            query: QUERY_DEFAULT,
          })
        };
      }

    return options;
  }


  // fetching data using the anilist api
  const fetchData = async (mode) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const options = buildOptions(mode);
      const response = await fetch(URL, options);
      if(!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseJson = await response.json();
      const resultList = responseJson.data.Page.media;
      setAnimeList(resultList);
    }
    catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" >
        <header>
          <h1>Anime<span className="text-gradient">Find</span></h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchedTerm={searchedTerm}
            setSearchedTerm={setSearchedTerm}
            mode={mode}
            setMode={setMode}
            fetchData={fetchData}
          />
        </header>

        <section>
          <div className="movie-list">
            <h2 className="text-white mt-[40px] mb-[20px]">
              {(isLoading && errorMessage.length == 0)
                ? `Loading...`
                : mode === "search" && animeList.length > 0
                ? `Search Results for "${searchedTerm}"`
                : `Trending Anime`}
            </h2>
          </div>

          <div>
            <ul>
              {animeList.map((anime) => (
                <div key={anime.id}>
                  <p className="text-white">Anime Name: {anime.title?.english ?? anime.title?.native}</p>
                  <p className="text-white">
                    Genre: {
                      anime.genres.map((genre, index) => {
                        if(index == anime.genres.length - 1) return `${genre}`
                        return `${genre}, `
                      })
                    }
                  </p>
                  <p className="text-white">Anime Popularity: {anime.popularity}</p>
                  <p className="text-white">Anime Score: {anime.meanScore}</p>
                  <br />
                </div>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App