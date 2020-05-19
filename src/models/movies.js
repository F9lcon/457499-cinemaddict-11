import {FilterType} from "../consts";
import {getFilmsByFilter} from "../utils/filter";

export default class Movies {
  constructor() {
    this._movies = null;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._activeFilterType = FilterType.ALL;
  }

  getMovies() {
    return getFilmsByFilter(this._movies, this._activeFilterType);
  }

  getAllMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }



  updateMovieData(movieController, filmId, newData) {
    const index = this._movies.findIndex((it) => it.id === filmId);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index),
        newData, this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    movieController.updateMovieControllerData(this._movies[index]);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
