import React from 'react';

const MoviesList = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => {
        return <li key={id}>{title}</li>;
      })}
    </ul>
  );
};

export default MoviesList;
