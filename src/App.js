import { useEffect, useState} from 'react'
import axios from 'axios';
import MovieCard from './component/MovieCard';
import YouTube from 'react-youtube'
import Logo from './asset/logo.png'
import {FaSearch} from 'react-icons/fa'
import Footer from './component/Footer';


function App() {


  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"
  const API_URL = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [playTrailer, setPlayTrailer] = useState(false)

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover"
    const {data: {results} } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,  
        query: searchKey
      }
  })
 setMovies(results)
 await selectMovie(results[0])

}

const fetchMovie = async (id) => {
  const {data} = await axios.get(`${API_URL}/movie/${id}`, {
    params: {
      api_key: process.env.REACT_APP_MOVIE_API_KEY,
      append_to_response: 'videos'
    }
    
  })  
  return data

}

const selectMovie = async (movie) => {
  setPlayTrailer(false)
  const data = await fetchMovie(movie.id)
  setSelectedMovie(data)
}


  useEffect(() => {
    fetchMovies()
  },[])

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
      key={movie.id}
      movie={movie}
      selectMovie={selectMovie}
      />
    ))
  )

  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)
  }


const renderTrailer = () => {
  const trailer = selectedMovie.videos.results.find(vid => vid.name === "Official Trailer")
  const key = trailer ? trailer.key : selectedMovie.videos.results[0].key

  return (
    <YouTube 
    videoId={key}
    containerClassName={"absolute h-screen inset-x-0 -bottom-28 "}
    opts={{
      width: "100%",
      height: "75%",

      playerVars: {
        autoplay: 1,
        controls: 0,
      }
    }}

    />
  )
  }

  return (

    <div className='bg-black'>
    <div className='flex justify-between w-full uppercase'>
      <a href="/"><img src={Logo} alt='logo' height={50} width={200} className="m-1" /></a>
      <form onSubmit={searchMovies}>
        <div className='flex'>
        <input type="text" onChange={(e)=> setSearchKey(e.target.value)} className="text-theme text-2xl font-bebs border border-yellow-500 h-22 bg-black m-3 md:w-36 sm:w-28"/>
        <FaSearch className='text-theme text-2xl cursor-pointer mt-4 mr-2 md:text-xl sm:text-xl hover:text-white' type={'submit'}/>
        </div>
      </form>
    </div>

    <div className='relative h-screen bg-cover bg-no-repeat bg-center border m-2 font-bebs md:text-xl sm:text-xl' style={{backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`}}/>
  
    <div className='ml-3 align-center absolute inset-x-0 left-0 bottom-0 h-18 m-3'>
        {playTrailer ? <button className='text-theme text-2xl font-bebs border border-2 rounded cursor-pointer p-5 absolute z-10 bottom-22 left-5 hover:text-white md:bottom-28 p-1 m-3 text-2xl' onClick={() => setPlayTrailer(false)}>Close</button> : null}
        {selectedMovie.videos && playTrailer ? renderTrailer() : null}
    <button className='text-theme text-2xl border border-2 rounded cursor-pointer ml-5 p-5 hover:text-white'  onClick={() => setPlayTrailer(true)}>Play Trailer</button>
      <h1 className='text-4xl text-theme  m-6 md:text-xl sm:text-xl'>{selectedMovie.title}</h1>
      {selectedMovie.overview ? <p className={"text-2xl text-theme bg-black p-4 border-radius-2 md:text-xl sm:text-xl"}>{selectedMovie.overview}</p> : null}
      </div>



      <div className='bg-black p-0 grid grid-cols-4 gap-1'>
          {renderMovies()}
        </div>

        <Footer/>
</div>




  );
}

export default App;
