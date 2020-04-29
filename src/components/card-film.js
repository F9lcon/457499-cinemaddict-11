import AbstractComponent from "./abstract-component";
import {ELEMENTS_TO_LISTEN} from "../consts";

const createCardFilm = ({title, poster, rate, year, time, genres, description,
  comments, maxDescriptionLength}) => {

  const getShortDescription = () => {
    let result = ``;
    let shortDescription = description.slice(0, maxDescriptionLength);
    if (shortDescription[shortDescription.length - 1]) {
      result = shortDescription.split(` `).slice(0, -1).join(` `);
    }
    return result;
  };

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rate}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${time}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length < maxDescriptionLength ? description : `${getShortDescription()}...`}</p>
          <a class="film-card__comments">${comments.length}  ${comments.length === 0 || comments.length > 1 ? `comments` : `comment`}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
   </article>`;
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardFilm(this._film);
  }

  setClickHandler(handler) {
    ELEMENTS_TO_LISTEN.forEach((cssClassName) => {
      this.getElement().querySelector(cssClassName).addEventListener(`click`, handler);
    });
  }
}

