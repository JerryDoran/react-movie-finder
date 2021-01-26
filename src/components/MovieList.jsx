import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, viewMovieInfo }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {movies.map((movie, index) => {
            return (
              <Movie key={index} {...movie} viewMovieInfo={viewMovieInfo} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
