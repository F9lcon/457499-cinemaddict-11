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

const renderFilms = (data, container, onDataChange) => {
  return data.map((filmData) => {
    const movieController = new MovieController(container, onDataChange);
    movieController.render(filmData);
    return movieController;
  });
};

export default class PageController {
  constructor() {
    this._sortComponent = new Sort();
    this._showMoreBtnComponent = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();
    this._filmsContainerNoData = new FilmsContainerNoData();
    this._films = [];
    this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
    this._showedMovieControllers = [];
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsBoard = null;
    this._filmsListContainer = null;
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

  _renderShowMoreBtn(films) {
    if (films.length <= SHOWING_FILMS_COUNT_ON_START) {
      return;
    }

    renderElement(this._filmsBoard, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

    this._showMoreBtnComponent.setClickHandler(() => {
      const prevFilmCount = this._showingFilmsCounter;
      this._showingFilmsCounter += SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = this._getSortedFilms(films, this._sortComponent.sortType,
          prevFilmCount, this._showingFilmsCounter);

      const newFilms = renderFilms(sortedFilms, this._filmsListContainer, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      if (this._showingFilmsCounter >= films.length) {
        remove(this._showMoreBtnComponent);
      }
    }
    );
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
    const sortedData = this._getSortedFilms(this._films, sortType,
        0, this._showingFilmsCounter);
    remove(this._filmsContainer);
    remove(this._showMoreBtnComponent);
    this._renderFilmsBoard();
    const newFilms = renderFilms(sortedData, this._filmsListContainer, this._onDataChange);
    this._showedMovieControllers = newFilms;
    this._renderShowMoreBtn(this._films);
  }


  _renderFilmsBoard() {
    renderElement(mainElement, this._filmsContainer, RenderPosition.BEFOREEND);
    this._filmsBoard = this._filmsContainer.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._filmsContainer.getElement()
      .querySelector(`.films-list__container`);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  render(films) {
    this._films = films;

    renderElement(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    if (!this._films.length) {
      renderElement(mainElement, this._filmsContainerNoData, RenderPosition.BEFOREEND);
      return;
    }
    this._renderFilmsBoard();
    const newFilms = renderFilms(this._films.slice(0, this._showingFilmsCounter),
        this._filmsListContainer, this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
    this._renderShowMoreBtn(this._films);

    this._sortComponent.setSortTypeHandler((sortType) => {
      this._onSortTypeChange(sortType);
    });
  }
}
