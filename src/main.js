import Profile from "./components/profile";
import Navigator from "./components/navigator";
import Sort from "./components/sort";
import FilmsContainer from "./components/films-container";
import Film from "./components/card-film";
import ButtonShowMore from "./components/btn-show-more";
import FilmDetails from "./components/film-details";
import FilmsContainerNoData from "./components/films-container-no-data";
import StatFooter from "./components/stat-footer";
import {generateMock} from "./mock/film";
import {RenderPosition, ELEMENTS_TO_LISTEN} from "./consts";
import {render} from "./utils";


const FILM_COUNT = 0;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const mainElement = document.querySelector(`main`);
const films = generateMock(FILM_COUNT);

let showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;

render(document.querySelector(`.header`), new Profile().getElement(),
    RenderPosition.BEFOREEND);

render(mainElement, new Sort().getElement(), RenderPosition.AFTERBEGIN);
render(mainElement, new Navigator().getElement(), RenderPosition.AFTERBEGIN);
render(document.querySelector(`.footer__statistics`),
    new StatFooter(FILM_COUNT).getElement(), RenderPosition.BEFOREEND);


const renderPopup = (element) => {
  const closePopup = () => {
    document.querySelector(`body`).removeChild(element);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup(element);
    }
  };

  document.querySelector(`body`).appendChild(element);

  element.querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, function () {
      closePopup();
    });
  document.addEventListener(`keydown`, onEscKeyDown);
};

const renderCards = (filmData) => {
  const film = new Film(filmData);
  const filmPopup = new FilmDetails(filmData);
  render(mainElement.querySelector(`.films-list__container`),
      film.getElement(), RenderPosition.BEFOREEND);

  ELEMENTS_TO_LISTEN.forEach((element) => {
    film.getElement().querySelector(element).addEventListener(`click`, function () {
      renderPopup(filmPopup.getElement());
    });
  });
};

if (films.length) {
  render(mainElement, new FilmsContainer().getElement(), RenderPosition.BEFOREEND);

  films.slice(0, showingFilmsCounter).forEach((el) => {
    renderCards(el);
  });
  const filmList = mainElement.querySelector(`.films-list`);
  render(filmList, new ButtonShowMore().getElement(), RenderPosition.BEFOREEND);

  const showMoreBtnElement = document.querySelector(`.films-list__show-more`);

  showMoreBtnElement.addEventListener(`click`, () => {
    const prevFilmCount = showingFilmsCounter;
    showingFilmsCounter += SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmCount, showingFilmsCounter).forEach((el) => {
      renderCards(el);
    });

    if (showingFilmsCounter >= films.length) {
      showMoreBtnElement.remove();
    }
  });
} else {
  render(mainElement, new FilmsContainerNoData().getElement(), RenderPosition.BEFOREEND);
}
