import {renderElement, RenderPosition, remove} from "../utils/render";
import FilmCard from "../components/card-film";
import FilmDetails from "../components/film-details";

export default class MovieController {
  constructor(container, onDataChange) {
    this._containerForDetails = document.querySelector(`body`);
    this._containerForCard = container;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(filmData) {
    this._filmCardComponent = new FilmCard(filmData);
    this._filmDetailsComponent = new FilmDetails(filmData);

    this._filmDetailsComponent.setAddToWatchListHandler(() => {
      this._onDataChange(this, filmData, Object.assign({}, filmData,
          {isWatchlist: !filmData.isWatchlist}));
      this._filmDetailsComponent.rerender();
    });

    this._filmDetailsComponent.setMarkAsWatchedHandler(() => {
      this._onDataChange(this, filmData, Object.assign({}, filmData,
          {isWatched: !filmData.isWatched}));
    });

    this._filmDetailsComponent.setAddToFavoriteHandler(() => {
      this._onDataChange(this, filmData, Object.assign({}, filmData,
          {isFavorite: !filmData.isFavorite}));
    });

    this._filmCardComponent.setAddToWatchListHandler(() => {
      this._onDataChange(this, filmData, Object.assign({}, filmData,
          {isWatchlist: !filmData.isWatchlist}));
    });

    this._filmCardComponent.setMarkAsWatchedHandler(() => {
      this._onDataChange(this, filmData, Object.assign({}, filmData,
          {isWatched: !filmData.isWatched}));
    });

    this._filmCardComponent.setAddToFavoriteHandler(() => {
      this._onDataChange(this, filmData, Object.assign({}, filmData,
          {isFavorite: !filmData.isFavorite}));
    });


    this._filmCardComponent.setClickHandler(()=> {
      renderElement(this._containerForDetails, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });


    this._filmDetailsComponent.setCloseBtnHandler(() => {
      this._closePopup();
    });

    renderElement(this._containerForCard, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopup();
    }
  }

  _closePopup() {
    console.log(this._filmDetailsComponent.getElement().parentElement);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    // this._containerForDetails.removeChild(this._filmDetailsComponent.getElement());
    remove(this._filmDetailsComponent);
  }
}


