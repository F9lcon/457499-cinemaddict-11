import {createProfile} from "./components/profile";
import {createNavigator} from "./components/navigator";
import {createFilmsContainer} from "./components/films-container";
import {createCardFilm} from "./components/card-film";
import {createBtnShowMore} from "./components/btn-show-more";
import {createFilmDetails} from "./components/film-details";
import {generateMock} from "./mock/film";

const FILM_COUNT = 22;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const mainElement = document.querySelector(`main`);

const renderComponent = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

renderComponent(document.querySelector(`.header`), createProfile());
renderComponent(mainElement, createNavigator());
renderComponent(mainElement, createFilmsContainer());

const listContainer = mainElement.querySelector(`.films-list__container`);

const films = generateMock(FILM_COUNT);

let showingFilmsCounter = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCounter).forEach((film) => renderComponent(listContainer, createCardFilm(film)));

renderComponent(mainElement.querySelector(`.films-list`), createBtnShowMore());
renderComponent(document.querySelector(`body`), createFilmDetails(films[0]));


const showMoreBtn = document.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCounter;
  showingFilmsCounter += SHOWING_FILMS_COUNT_BY_BUTTON;
  films.slice(prevFilmCount, showingFilmsCounter).forEach((film) =>
    renderComponent(listContainer, createCardFilm(film)));
  if (showingFilmsCounter >= films.length) {
    showMoreBtn.remove();
  }
});

