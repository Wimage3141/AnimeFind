import React from 'react'

const MovieCard = ({ anime: {title, genres, meanScore, coverImage} }) => {
  return (
    <div className="anime-card">
      <img src={coverImage.extraLarge}/>
      <div>
        <h3 className="text-white mt-[20px]">
          {title?.english ?? title?.romaji ?? title?.native}
        </h3>

        <div className="content">

          <div className="rating">
            <img src="../public/rating.svg"/>
          </div>

          <p className="text-white">{meanScore}</p>
          <span>•</span>
          <p className="text-white">{genres[0]}</p>
          <p className="text-white">
          </p>
        </div>

      </div>

    </div>
  )
}

export default MovieCard