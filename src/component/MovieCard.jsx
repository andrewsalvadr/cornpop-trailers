import React from 'react'

function MovieCard({movie, selectMovie}) {
const IMAGE_PATH ="https://image.tmdb.org/t/p/w342"

console.log(movie)

  return (
    <div className='mt-2 h-auto w-full' onClick={()=> selectMovie(movie)}>
    {movie.poster_path ? <img className="h-auto w-auto border border-2 cursor-pointer hover:scale-110	transition duration-700 ease-in-out" src={`${IMAGE_PATH}${movie.poster_path}`} alt=""/>
    : 
    <div className='bg-white text-theme' >No cover found</div>
    
    }
       <h5>{movie.title}</h5>
</div>
  )
}

export default MovieCard