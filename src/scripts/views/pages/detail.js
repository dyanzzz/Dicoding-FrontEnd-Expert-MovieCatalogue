import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import { createLikeButtonTemplate, createMovieDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
 
const Detail = {
	async render() {
		return `
			<div id="movie" class="movie"></div>
			<div id="likeButtonContainer"></div>
		`;
	},
 
	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		
		const movie = await TheMovieDbSource.detailMovie(url.id);
		const movieContainer = document.querySelector('#movie');
		const likeButtonContainer = document.querySelector('#likeButtonContainer');

		movieContainer.innerHTML = createMovieDetailTemplate(movie);
		likeButtonContainer.innerHTML = createLikeButtonTemplate();

		LikeButtonInitiator.init({
			likeButtonContainer: document.querySelector('#likeButtonContainer'),
			movie: {
				id: movie.id,
				title: movie.title,
				overview: movie.overview,
				backdrop_path: movie.backdrop_path,
				poster_path: movie.poster_path,
				vote_average: movie.vote_average,
				popularity: movie.popularity,
				tagline: movie.tagline,
				release_date: movie.release_date,
				runtime: movie.runtime,
			},
		});

		console.log("##### Detail Movie => %o", movie);

	},
};
 
export default Detail;