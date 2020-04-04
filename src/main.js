import {createProfile} from "./components/profile";
import {createNavigator} from "./components/navigator";
import {createFilmsContainer} from "./components/films-container";
import {createCardFilm} from "./components/card-film";
import {createBtnShowMore} from "./components/btn-show-more";
import {createFilmDetails} from "./components/film-details";

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const mainElement = document.querySelector(`main`);

const renderComponent = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

renderComponent(document.querySelector(`.header`), createProfile());
renderComponent(mainElement, createNavigator());
renderComponent(mainElement, createFilmsContainer());

const listContainer = mainElement.querySelector(`.films-list__container`);
const extraList = mainElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  renderComponent(listContainer, createCardFilm());
}

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  extraList.forEach((list) => renderComponent(list, createCardFilm()));
}

renderComponent(mainElement.querySelector(`.films-list`), createBtnShowMore());
renderComponent(document.querySelector(`body`), createFilmDetails());
