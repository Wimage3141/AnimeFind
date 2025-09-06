import React from 'react'

function Search({ searchTerm, setSearchTerm, searchedTerm, setSearchedTerm, mode, setMode, fetchData }) {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search"/>
            <input
                type="text"
                placeholder="Start Searching..."
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)} }
            />
            <button
            className="px-3 py-2 border rounded bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
            onClick={
            () => {
                let currMode = "search";
                if(searchTerm.length == 0) {
                  currMode = "default";
                }
                setMode(currMode);
                fetchData(currMode);
                setSearchedTerm(searchTerm);
              }
            }
            >Search</button>
        </div>
    </div>
  )
}

export default Search