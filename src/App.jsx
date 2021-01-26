import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import Nav from "./components/Nav";
import Pagination from "./components/Pagination";
import SearchArea from "./components/SearchArea";
import MovieInfo from "./components/MovieInfo";
import "./styles.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState(null);

  const numberPages = Math.floor(totalMovies / 20);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalMovies(data.total_results);
        console.log(movies);
      });
  };

  const search = (e) => {
    setSearchTerm(e.target.value);
  };

  const nextPage = (page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setCurrentPage(page);
      });
  };

  const viewMovieInfo = (id) => {
    const filteredMovie = movies.filter((movie) => movie.id === id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;

    setCurrentMovie(newCurrentMovie);
  };

  const closeMovieInfo = () => {
    setCurrentMovie(null);
  };

  return (
    <div className="App">
      <Nav />
      {currentMovie === null ? (
        <div>
          <SearchArea handleSubmit={handleSubmit} handleChange={search} />
          <MovieList movies={movies} viewMovieInfo={viewMovieInfo} />
        </div>
      ) : (
        <MovieInfo
          closeMovieInfo={closeMovieInfo}
          currentMovie={currentMovie}
        />
      )}

      {totalMovies > 20 && currentMovie === null ? (
        <Pagination
          pages={numberPages}
          nextPage={nextPage}
          currentPage={currentPage}
        />
      ) : (
        ""
      )}
    </div>
  );
}
