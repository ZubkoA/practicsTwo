// import { Component } from 'react';
// import Button from './Button/Button';
// import { fetchMovies } from 'services/moviesApi';
// import MoviesList from './MovesList/MoviesList';

// export class App extends Component {
//   state = {
//     movies: [],
//     isListShow: false,
//     isLoading: false,
//     page: 1,
//   };

//   componentDidUpdate(_, prevState) {
//     const { isListShow, page } = this.state;
//     if (
//       (prevState.isListShow !== isListShow || page !== prevState.page) &&
//       isListShow
//     ) {
//       this.setState({ isLoading: true });
//       fetchMovies(page)
//         .then(({ data: { results } }) => {
//           this.setState(prevState => {
//             return { movies: [...prevState.movies, ...results] };
//           });
//         })
//         .catch(error => console.log(error))

//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//     if (prevState.isListShow !== isListShow && isListShow === false) {
//       this.setState({
//         movies: [],
//         page: 1,
//       });
//     }
//   }

//   onVisibilityChange = () => {
//     this.setState(prevState => {
//       return { isListShow: !prevState.isListShow };
//     });
//   };
//   loadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   render() {
//     const { isListShow, movies } = this.state;
//     return (
//       <div>
//         <Button
//           clickHandler={this.onVisibilityChange}
//           text={isListShow ? 'Hide list movies' : 'Show movies list'}
//         />
//         {isListShow && (
//           <>
//             <MoviesList movies={movies} />{' '}
//             <Button text="Load more" clickHandler={this.loadMore} />
//           </>
//         )}
//       </div>
//     );
//   }
// }

// import { Component } from 'react';
import Button from './Button/Button';
import { fetchMovies } from 'services/moviesApi';
import MoviesList from './MovesList/MoviesList';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from './Loader/Loader';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [isListShow, setIsListShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isListShow === true) {
      setIsLoading(true);
      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prev => [...prev, ...results]);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (isListShow === false) {
      setMovies([]);
      setPage(1);
    }
  }, [isListShow, page]);

  const onVisibilityChange = () => {
    setIsListShow(prev => !prev);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <Button
        clickHandler={onVisibilityChange}
        text={isListShow ? 'Hide list movies' : 'Show movies list'}
      />
      {isListShow && (
        <>
          <MoviesList movies={movies} />{' '}
          {!isLoading && <Button text="Load more" clickHandler={loadMore} />}
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};
