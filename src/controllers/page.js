import Film from "../components/card-film";
import FilmDetails from "../components/film-details";
import {remove, render, renderPopup, RenderPosition} from "../utils/render";
import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/btn-show-more";
import FilmsContainerNoData from "../components/films-container-no-data";
import Sort from "../components/sort";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const mainElement = document.querySelector(`main`);

const renderCards = (filmData) => {
  const film = new Film(filmData);
  const filmPopup = new FilmDetails(filmData);
  render(mainElement.querySelector(`.films-list__container`),
      film, RenderPosition.BEFOREEND);

  film.setClickHandler(() => {
    renderPopup(filmPopup);
  });
};

let showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;

export default class PageController {
  constructor() {
    this._sortComponent = new Sort();
    this._showMoreBtnComponent = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();
    this._filmsContainerNoData = new FilmsContainerNoData();
  }

  render(films) {
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    if (films.length) {
      render(mainElement, this._filmsContainer, RenderPosition.BEFOREEND);

      films.slice(0, showingFilmsCounter).forEach((el) => {
        renderCards(el);
      });
      const filmList = mainElement.querySelector(`.films-list`);
      render(filmList, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

      this._showMoreBtnComponent.setClickHandler(() => {
        const prevFilmCount = showingFilmsCounter;
        showingFilmsCounter += SHOWING_FILMS_COUNT_BY_BUTTON;

        films.slice(prevFilmCount, showingFilmsCounter).forEach((el) => {
          renderCards(el);
        });

        if (showingFilmsCounter >= films.length) {
          remove(this._showMoreBtnComponent);
        }
      }
      );
    } else {
      render(mainElement, this._filmsContainerNoData, RenderPosition.BEFOREEND);
    }
  }
}
