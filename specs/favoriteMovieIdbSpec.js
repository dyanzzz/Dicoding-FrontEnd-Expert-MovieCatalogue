import { itActsAsFavoriteMovieModel } from  './contract/favoriteMovieContract';
import FavoriteMovieIdb from '../src/scripts/data/favoritemovie-idb';

describe('Favorite movie idb contract test implementation', () => {
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllMovies()).forEach(async (movie) => {
      await FavoriteMovieIdb.deleteMovie(movie.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMovieIdb);
});
