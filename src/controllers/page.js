import Film from "../components/card-film";
import FilmDetails from "../components/film-details";
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

const renderCard = (filmData, container) => {
  const filmCardComponent = new Film(filmData);
  const filmPopup = new FilmDetails(filmData);
  renderElement(container, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setClickHandler(() => {
    const popupController = new MovieController();
    popupController.render(filmPopup);
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

      sortedFilms.forEach((el) => {
        renderCard(el, this._filmsListContainer);
      });

      if (this._showingFilmsCounter >= films.length) {
        remove(this._showMoreBtnComponent);
      }
    }
    );
  }

  render(films) {
    this._films = films;
    const renderContent = (data) => {
      renderFilmsBoard();
      data.slice(0, this._showingFilmsCounter).forEach((el) => {
        renderCard(el, this._filmsListContainer);
      });
      this._renderShowMoreBtn(films);
    };

    const renderFilmsBoard = () => {
      renderElement(mainElement, this._filmsContainer, RenderPosition.BEFOREEND);
      this._filmsBoard = this._filmsContainer.getElement().querySelector(`.films-list`);
      this._filmsListContainer = this._filmsContainer.getElement()
        .querySelector(`.films-list__container`);
    };

    renderElement(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    if (!this._films.length) {
      renderElement(mainElement, this._filmsContainerNoData, RenderPosition.BEFOREEND);
      return;
    }

    renderContent(this._films);

    this._sortComponent.setSortTypeHandler((sortType) => {
      this._showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
      const sortedData = this._getSortedFilms(this._films, sortType, 0, this._showingFilmsCounter);
      remove(this._filmsContainer);
      remove(this._showMoreBtnComponent);
      renderContent(sortedData);
    });
  }
}
