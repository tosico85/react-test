import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  async getMovies() {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      'https://yts-proxy.now.sh/list_movies.json?sort_by=rating',
    );
    console.log(movies);
    this.setState({ isLoading: false, movies });
  }

  componentDidMount() {
    console.log('Im rendering');
    this.getMovies();
  }

  componentDidUpdate() {
    console.log('I just updated.');
  }

  render() {
    const { isLoading, movies } = this.state;

    return (
      <div className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

/* const list = [
    {
        id: 1,
        name: 'woody',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFjeFj3uciWfWADD0URJWrKOhSuCITuQmdGOvaRCMPMegNzP1D' 
    },
    {
        id: 2,
        name: 'dog',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2dXW51ZK1E2TW1_KP69i3mbRflSZwJ_wussEpLKKbmHnOAbfL'
    }
];

Toy.propTypes = {
    image: PropTypes.string.isRequired
};

function Toy({name, image}) {
    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name} />
        </div>
    );
}

function App() {
    return (
        <div>
            {list.map((data)=>{return (<Toy key={data.id} name={data.name} pic={data.image} />)})}
        </div>
    );
} */

export default App;
