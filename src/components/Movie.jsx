import React from "react";

const Movie = ({ poster_path, viewMovieInfo, id }) => {
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          {poster_path == null ? (
            <img
              src={
                "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
              }
              alt="movie"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`http:image.tmdb.org/t/p/w185${poster_path}`}
              alt="default movie"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div className="card-content">
          <p>
            <a href="#" onClick={() => viewMovieInfo(id)}>
              View Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
