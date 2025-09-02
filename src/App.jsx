import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const mostPopular = (searchList) => {
    searchList.forEach()
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [topSearchResult, setTopSearchResult] = useState([]);

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
      console.log("options.body.variables: " + options.body.variables);
      const response = await fetch(url, options);
      if(!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseJson = await response.json();
      console.log("The result is: ");
      console.log(responseJson.data.Page.media);
      setTopSearchResult(responseJson.data.Page.media[0]);
      console.log(topSearchResult);
      return responseJson.data;
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
          >Test</button>
          {`${topSearchResult}` ?
          <div>
            <p className="text-white">{`Anime id: ${topSearchResult.id}`}</p>
            <p className="text-white">{`Anime Name: ${topSearchResult.title.english}`}</p>
            <p className="text-white">{`Anime Popularity: ${topSearchResult.popularity}`}</p>
            <p className="text-white">{`Anime Score: ${topSearchResult.meanScore}`}</p>
          </div> :
          <div className='text-white'>NO</div>}
        </header>
      </div>
    </main>
  )
}

export default App