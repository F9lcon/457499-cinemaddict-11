import Film from "../components/card-film";
import FilmDetails from "../components/film-details";
import {remove, render, renderPopup, RenderPosition} from "../utils/render";
import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/btn-show-more";
import FilmsContainerNoData from "../components/films-container-no-data";
import Sort from "../components/sort";
import {SortType} from "../components/sort";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`main`);

const renderCards = (filmData, container) => {
  const film = new Film(filmData);
  const filmPopup = new FilmDetails(filmData);
  render(container, film, RenderPosition.BEFOREEND);

  film.setClickHandler(() => {
    renderPopup(filmPopup);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
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
};

let showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;

export default class PageController {
  constructor() {
    this._sortComponent = new Sort();
    this._showMoreBtnComponent = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();
    this._filmsContainerNoData = new FilmsContainerNoData();

    this._filmsBoard = null;
    this._filmsListContainer = null;
  }

  render(films) {
    const renderContent = (data) => {
      renderFilmsBoard();
      data.slice(0, showingFilmsCounter).forEach((el) => {
        renderCards(el, this._filmsListContainer);
      });
      renderShowMoreBtn();
    };

    const renderShowMoreBtn = () => {
      if (films.length <= SHOWING_FILMS_COUNT_ON_START) {
        return;
      }

      render(this._filmsBoard, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

      this._showMoreBtnComponent.setClickHandler(() => {
        const prevFilmCount = showingFilmsCounter;
        showingFilmsCounter += SHOWING_FILMS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortComponent.sortType,
            prevFilmCount, showingFilmsCounter);

        sortedFilms.forEach((el) => {
          renderCards(el, this._filmsListContainer);
        });

        if (showingFilmsCounter >= films.length) {
          remove(this._showMoreBtnComponent);
        }
      }
      );
    };

    const renderFilmsBoard = () => {
      render(mainElement, this._filmsContainer, RenderPosition.BEFOREEND);
      this._filmsBoard = this._filmsContainer.getElement().querySelector(`.films-list`);
      this._filmsListContainer = this._filmsContainer.getElement()
        .querySelector(`.films-list__container`);
    };

    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    if (!films.length) {
      render(mainElement, this._filmsContainerNoData, RenderPosition.BEFOREEND);
      return;
    }

    renderContent(films);

    this._sortComponent.setSortTypeHandler((sortType) => {
      showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
      const sortedData = getSortedFilms(films, sortType, 0, showingFilmsCounter);
      remove(this._filmsContainer);

      renderContent(sortedData);
    });
  }
}
