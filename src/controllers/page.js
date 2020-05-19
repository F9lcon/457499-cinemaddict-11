import {remove, renderElement, RenderPosition} from "../utils/render";
import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/btn-show-more";
import FilmsContainerNoData from "../components/films-container-no-data";
import Sort from "../components/sort";
import {SortType} from "../components/sort";
import MovieController from "./MovieController";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`main`);

const createMovieControllers = (data, container, onDataChange, onViewChange, onCommentChange) => {
  return data.map((filmData) => {
    const movieController = new MovieController(container, onDataChange, onViewChange, onCommentChange);
    movieController.render(filmData);
    return movieController;
  });
};

export default class PageController {
  constructor(moviesModel) {
    this._sortComponent = new Sort();
    this._showMoreBtnComponent = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();
    this._filmsContainerNoData = new FilmsContainerNoData();
    this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
    this._showedMovieControllers = [];

    this._filmsBoard = null;
    this._filmsListContainer = null;
    this._moviesModel = moviesModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

  }

  _getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const filmsToSort = films.slice();
    switch (sortType) {
      case SortType.DEFAULT:
        sortedFilms = filmsToSort;
        break;
      case SortType.RATING:
        sortedFilms = filmsToSort.sort((a, b) => b.rate - a.rate);
        break;
      case SortType.DATE:
        sortedFilms = filmsToSort.sort((a, b) => new Date(b.releaseDate) -
          new Date(a.releaseDate));
    }
    return sortedFilms.slice(from, to);
  }

  _renderShowMoreBtn() {
    const films = this._moviesModel.getMovies();
    if (films.length <= SHOWING_FILMS_COUNT_ON_START) {
      return;
    }

    renderElement(this._filmsBoard, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

    this._showMoreBtnComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {
    const films = this._moviesModel.getMovies();
    const prevFilmCount = this._showingFilmsCounter;
    this._showingFilmsCounter += SHOWING_FILMS_COUNT_BY_BUTTON;


    const sortedFilms = this._getSortedFilms(films, this._sortComponent.sortType,
        prevFilmCount, this._showingFilmsCounter);

    const newFilms = createMovieControllers(sortedFilms, this._filmsListContainer,
        this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    if (this._showingFilmsCounter >= films.length) {
      remove(this._showMoreBtnComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
    const sortedData = this._getSortedFilms(this._moviesModel.getMovies(), sortType,
        0, this._showingFilmsCounter);

    this._removeMovies();
    this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;

    const newFilms = createMovieControllers(sortedData, this._filmsListContainer,
        this._onDataChange, this._onViewChange);
    this._showedMovieControllers = newFilms;
    this._renderShowMoreBtn();
  }


  _renderFilmsBoard() {
    renderElement(mainElement, this._filmsContainer, RenderPosition.BEFOREEND);
    this._filmsBoard = this._filmsContainer.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._filmsContainer.getElement()
      .querySelector(`.films-list__container`);
  }

  _onDataChange(movieController, oldData, newData) {
    this._moviesModel.updateMovieData(movieController, oldData.id, newData);
  }

  render() {
    const films = this._moviesModel.getMovies();

    renderElement(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    if (!films.length) {
      renderElement(mainElement, this._filmsContainerNoData, RenderPosition.BEFOREEND);
      return;
    }


    this._renderFilmsBoard();
    const newFilms = createMovieControllers(films.slice(0, this._showingFilmsCounter),
        this._filmsListContainer, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);


    this._renderShowMoreBtn();

    this._sortComponent.setSortTypeHandler((sortType) => {
      this._onSortTypeChange(sortType);
    });
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
    remove(this._showMoreBtnComponent);
  }

  _updateMovies() {
    this._removeMovies();
    this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;

    const newFilms = createMovieControllers(this._moviesModel.getMovies().slice(0, this._showingFilmsCounter),
        this._filmsListContainer, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    this._renderShowMoreBtn();
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateMovies();
  }
}

