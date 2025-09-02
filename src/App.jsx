import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  // Wrap the result in html format
  const httpWrapper = list => list.map(result => (
    <div key={result.id}>
      <p className="text-white">Anime Name: {result.title?.english}</p>
      <p className="text-white">Anime Popularity: {result.popularity}</p>
      <p className="text-white">Anime Score: {result.meanScore}</p>
      <br />
    </div>
  ));

  // Find the most popular search result
  // IMPLEMENT here

  const [searchTerm, setSearchTerm] = useState("");
  const [topSearchResult, setTopSearchResult] = useState(null);
  const [searchList, setSearchList] = useState([]);

  // fetching data using the anilist api
  const query = `
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
        }
      }
    }
    `;
  const variables = {
      search: searchTerm
  };
  const url = "https://graphql.anilist.co";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
            query: query,
            variables: variables
          })
  }

  async function fetchData() {
    try {
      console.log("url: " + url);
      const response = await fetch(url, options);
      if(!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseJson = await response.json();
      console.log("The result is: ");
      if(!responseJson.data.Page.media.length) {
        console.log("The response json list is EMPTY!");
        setTopSearchResult(null);
      }
      const resultList = responseJson.data.Page.media;

      console.log("result list (wrapped in htm for rendering): ");
      console.log(httpWrapper(resultList));

      setSearchList(httpWrapper(resultList));
      console.log("searchList: ");
      console.log(searchList);

      setTopSearchResult(responseJson.data.Page.media[0]);



      console.log(topSearchResult);

    }
    catch(e) {
      console.log(e);
    }
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" >
        <header>
          <h1>Anime<span className="text-gradient">Find</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
          className="px-3 py-2 border rounded bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
          onClick={
            () => {
              console.log("Test button clicked");
              fetchData();
            }
          }
          >Search</button>
          <div>
            {topSearchResult ? (
              searchList
            ) : (
              <div className="text-white">NO</div>
            )}
          </div>

        </header>
      </div>
    </main>
  )
}

export default App