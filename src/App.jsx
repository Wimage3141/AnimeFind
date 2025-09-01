import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" >
        <header>
          <h1>Anime<span className="text-gradient">Find</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1>{searchTerm}</h1>
        </header>
      </div>
    </main>
  )
}

export default App