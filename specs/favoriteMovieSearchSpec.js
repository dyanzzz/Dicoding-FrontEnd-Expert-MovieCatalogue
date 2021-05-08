import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favoritemovie-idb';
import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';

describe('Searching movies', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  
  const constructorPresenter = () => {
    //spyOn(FavoriteMovieIdb, 'searchMovies');
    favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb)
    presenter = new FavoriteMovieSearchPresenter({ 
      favoriteMovies,
      view, 
    });
  }

  beforeEach(() => {
    // membuat abstraksi yg lebih rendah untuk mmbuat lebih dipahami
    setMovieSearchContainer();
    constructorPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {

      searchMovies('film a');

      expect(presenter._latestQuery).toEqual('film a');
    });

    it('should ask the model to search for liked movies', () => {
      /*
      spyOn(FavoriteMovieIdb, 'searchMovies');
      
      const presenter = new FavoriteMovieSearchPresenter({
        favoriteMovies: FavoriteMovieIdb
      });
      */

      /*
      const queryElement = document.getElementById('query');
      queryElement.value = 'film a';
      queryElement.dispatchEvent(new Event('change'));
      */

      searchMovies('film a');

      expect(favoriteMovies.searchMovies).toHaveBeenCalledWith('film a');
    });

/*
    // duplikat dengan
    // should show the movies found by Favorite Movies
    // dan
    // should show the name of the movies found by Favorite Movies
    it('should show the found movies', () => {
      presenter._showFoundMovies([{
        id: 1, title: 'film satu'
      }]);

      // kemudian tes film diatas ditampilkan
      presenter._showFoundMovies([
        {
          id: 1, title: 'satu'
        },
        {
          id: 2, title: 'dua'
        }
      ]);

      const foundMovies = document.querySelectorAll('.movie');

      expect(foundMovies.length).toEqual(2);
    });

    it('should show the title of the found movie', () => {
      presenter._showFoundMovies([
        {
          id: 1, title: 'satu'
        },
        {
          id: 2, title: 'dua'
        }
      ]);

      const foundMovies = document.querySelectorAll('.movie__title');
      expect(foundMovies.item(0).textContent)
        .toEqual('satu');
      expect(foundMovies.item(1).textContent)
        .toEqual('dua');
    });

    it('should show - for found movie without title', () => {
      presenter._showFoundMovies([
        {
          id: 1
        }
      ]);

      const foundMovies = document.querySelectorAll('.movie__title');
      expect(foundMovies.item(0).textContent)
        .toEqual('-');
    });
*/

    it('should show - when the movie returned does not contain a title', (done) => {
      document.getElementById('movie-search-container').addEventListener('movies:searched:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('-');
     
        done();
      });
     
      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);
     
      searchMovies('film a');
    });

    it('should show the movies found by Favorite Movies', (done) => {
      document.getElementById('movie-search-container').addEventListener('movies:searched:updated', () => {
        const movie = document.querySelectorAll('.movie');
        expect(movie.length).toEqual(3);
        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        {
          id: 111, title: 'film abc'
        },
        {
          id: 222, title: 'ada juga film abcde'
        },
        {
          id: 333, title: 'ini juga boleh film a'
        }
      ]);

      searchMovies('film a');
    });

    it('should show the name of the movies found by Favorite Movies', (done) => {
      document.getElementById('movie-search-container')
        .addEventListener('movies:searched:updated', () => {
          const movieTitles = document.querySelectorAll('.movie__title');
          expect(movieTitles.item(0).textContent)
            .toEqual('film abc');
          expect(movieTitles.item(1).textContent)
            .toEqual('ada juga film abcde');
          expect(movieTitles.item(2).textContent)
            .toEqual('ini juga boleh film a');
     
          done();
        });
     
      favoriteMovies.searchMovies.withArgs('film a')
        .and
        .returnValues([
          {
            id: 111,
            title: 'film abc',
          },
          {
            id: 222,
            title: 'ada juga film abcde',
          },
          {
            id: 333,
            title: 'ini juga boleh film a',
          },
        ]);
     
      searchMovies('film a');
    });
  });

  describe('When query is Empty', () => {
    it('should capture the query as empty', () => {
      searchMovies('');

      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('  ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite movies', () => {
      searchMovies('  ');
      
      // jika menggunakan toHaveBeenCalledTimes(1);
      // maka method getAllMovies hanya dijalankan sekali
      expect(favoriteMovies.getAllMovies).toHaveBeenCalled();
    });
  });

  describe('when no favorite movies could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('movie-search-container').addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('.movies__not__found').length).toEqual(1);
        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);

      searchMovies('film a');
    });

    it('should not show to any movie', (done) => {
      document.getElementById('movie-search-container').addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('.movie').length).toEqual(0);
        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);

      searchMovies('film a');
    })
  });
});
