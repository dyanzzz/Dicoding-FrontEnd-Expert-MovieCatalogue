import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieDetailTemplate } from '../templates/template-creator';
 
const Detail = {
	async render() {
		return `
			<div id="movie" class="movie"></div>
		`;
	},
 
	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		console.log("#### "+JSON.stringify(url));
		
		const movie = await TheMovieDbSource.detailMovie(url.id);
		const movieContainer = document.querySelector('#movie');

		console.log(movie);
		console.log(movieContainer);

		movieContainer.innerHTML = createMovieDetailTemplate(movie);
	},
};
 
export default Detail;