import FavoriteMovieIdb from "../../data/favoritemovie-idb";
//import { createMovieItemTemplate } from "../templates/template-creator";
import FavoriteMovieSearchView from "./liked-movies/favorite-movie-search-view";
import FavoriteMovieShowPresenter from "./liked-movies/favorite-movie-show-presenter";
import FavoriteMovieSearchPresenter from "./liked-movies/favorite-movie-search-presenter"

const view = new FavoriteMovieSearchView();

const Like = {
	async render() {
		return view.getTemplate();
	},

	async afterRender() {
		new FavoriteMovieShowPresenter({ 
			view, 
			favoriteMovies: FavoriteMovieIdb 
		});
  	new FavoriteMovieSearchPresenter({ 
			view, 
			favoriteMovies: FavoriteMovieIdb 
		});
		
		/*
		const movies = await FavoriteMovieIdb.getAllMovies();
		const moviesContainer = document.querySelector('#movies');
		movies.forEach((movie) => {
			moviesContainer.innerHTML += createMovieItemTemplate(movie);
		});
		*/
	},

};

export default Like;
