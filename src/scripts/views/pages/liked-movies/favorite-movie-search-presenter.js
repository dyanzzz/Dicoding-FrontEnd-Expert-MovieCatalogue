class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies, view }) {
    // call abstraction to simple read
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteMovies = favoriteMovies;
  }

  // create abstraction to simple read
  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchMovies(latestQuery);
    });
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  _searchMovies(latestQuery) {
    this._latestQuery = latestQuery;
    this._favoriteMovies.searchMovies(this.latestQuery);
  }

  get latestQuery() {
    return this._latestQuery;
  }

  _showFoundMovies(movies) {
    this._view.showMovies(movies);    
  }

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundMovies;

    if(this.latestQuery.length > 0){
      foundMovies = await this._favoriteMovies.searchMovies(this.latestQuery);
    } else {
      foundMovies = await this._favoriteMovies.getAllMovies();
    }
    
    if(foundMovies){
      this._showFoundMovies(foundMovies);
    }
  }
}

export default FavoriteMovieSearchPresenter;
