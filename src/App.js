import React,{useEffect,useState} from 'react';
import Movie from './components/Movie';



const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=d22e64f56352cb1a608836f9b29a8292&language=en-US&sort_by=popularity.desc&page=1" ;

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=d22e64f56352cb1a608836f9b29a8292&query=";


function App() {
  const [movies,setMovies]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  useEffect(()=>{
    fetch(FEATURED_API)
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data);
      setMovies(data.results);
    });
  },[]);

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(searchTerm)
   { 
      fetch(SEARCH_API+searchTerm)
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results);
      });

      setSearchTerm('');
   }    
  };
  const handleOnChange=(e)=>{
    setSearchTerm(e.target.value);
  };

  return (
    <div>
    <header>
      <form onSubmit={handleOnSubmit}>
      <input type="search" 
      className="search" 
      placeholder="Search..." 
      value={searchTerm} 
      onChange={handleOnChange}
      />
      </form>
      </header>
    <div className="movie-container">
        {movies.length>0 && movies.map((movie)=>
          <Movie key={movie.id} {...movie}/>
        )}
      </div>
    </div>
  );
}

export default App;
