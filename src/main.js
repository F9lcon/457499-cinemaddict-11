import Profile from "./components/profile";
import Navigator from "./components/navigator";
import FilmsContainer from "./components/films-container";
import Film from "./components/card-film";
import ButtonShowMore from "./components/btn-show-more";
import FilmDetails from "./components/film-details";
import {generateMock} from "./mock/film";
import {RenderPosition, ELEMENTS_TO_LISTEN} from "./consts";
import {render} from "./utils";


const FILM_COUNT = 22;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const mainElement = document.querySelector(`main`);
const films = generateMock(FILM_COUNT);

let showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;

render(document.querySelector(`.header`), new Profile().getElement(),
    RenderPosition.BEFOREEND);
render(mainElement, new Navigator().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsContainer().getElement(), RenderPosition.BEFOREEND);

const listContainer = mainElement.querySelector(`.films-list__container`);

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
  render(listContainer, film.getElement(), RenderPosition.BEFOREEND);

  ELEMENTS_TO_LISTEN.forEach((element) => {
    film.getElement().querySelector(element).addEventListener(`click`, function () {
      renderPopup(filmPopup.getElement());
    });
  });
};

films.slice(0, showingFilmsCounter).forEach((el) => {
  renderCards(el);
});

render(mainElement.querySelector(`.films-list`),
    new ButtonShowMore().getElement(),
    RenderPosition.BEFOREEND);

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
