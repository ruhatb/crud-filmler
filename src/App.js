import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from './components/MovieHeader';
import AddMovie from "./components/AddMovie";
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import swal from "sweetalert";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    const newMovies = movies.filter((movie) => movie.id !== id );
    setMovies(newMovies);
    

    /* silinmiş movie için favoriden cıakrtma */ /* neden delete ? */

  const newFavoriteMovies = favoriteMovies.filter( (movie) => movie.id !== id );
  setFavoriteMovies(newFavoriteMovies);

  }


 




  const addToFavorites = (movie) => {
    const isThereIn = favoriteMovies.find((film) => film.id === movie.id);
    if( isThereIn ) {
     swal({
      title: "Opps!",
      text: "Zaten ekli..",
      icon: "succes",
      button: "Anladım",});
      return ;}
      

        swal( {
          title:"Başarıyla eklendi",
          text:   "Favorileri eklendi...",
          icon: "Succes",
          button: "Success it",
        });
        /* true false ? */ /* return ? */
        
        const newFavoriteMovies = [...favoriteMovies, movie];
        setFavoriteMovies(newFavoriteMovies);


  }

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
            <EditMovieForm setMovies={setMovies}/>
            </Route>

              <Route path="/movies/add">
            <AddMovie setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie
              deleteMovie={deleteMovie}
              addToFavorites={addToFavorites} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

