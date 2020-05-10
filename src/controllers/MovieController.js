import {renderElement, RenderPosition} from "../utils/render";
import FilmCard from "../components/card-film";
import FilmDetails from "../components/film-details";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._containerForDetails = document.querySelector(`body`);
    this._containerForCard = container;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;

    this._filmData = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onViewChange = onViewChange;
  }


  updateMovieControllerData(newData) {
    this._filmDetailsComponent.film = newData;
    this._filmData = newData;
    this._filmDetailsComponent.rerender();
  }

  render(filmData) {
    this._filmData = filmData;
    this._filmCardComponent = new FilmCard(this._filmData);
    this._filmDetailsComponent = new FilmDetails(this._filmData);

    this._filmDetailsComponent.setAddToWatchListHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatchlist: !this._filmData.isWatchlist}));
    });

    this._filmDetailsComponent.setMarkAsWatchedHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatched: !this._filmData.isWatched}));
    });

    this._filmDetailsComponent.setAddToFavoriteHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isFavorite: !this._filmData.isFavorite}));
    });

    this._filmDetailsComponent.setEmojiClick((evt) => {
      if (evt.target.nodeName === `INPUT`) {
        this._onDataChange(this, this._filmData, Object.assign({},
            this._filmData,
            {commentEmoji: {
              value: evt.target.value,
              src: `./images/emoji/${evt.target.value}.png`
            }}));
      }
    });

    this._filmCardComponent.setAddToWatchListHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatchlist: !this._filmData.isWatchlist}));
    });

    this._filmCardComponent.setMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatched: !this._filmData.isWatched}));
    });

    this._filmCardComponent.setAddToFavoriteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isFavorite: !this._filmData.isFavorite}));
    });

    this._filmCardComponent.setClickHandler(()=> {
      this._onViewChange();
      renderElement(this._containerForDetails, this._filmDetailsComponent,
          RenderPosition.BEFOREEND);

      this._filmDetailsComponent.setCloseBtnHandler(() => {
        this._closePopup();
      });

      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    renderElement(this._containerForCard, this._filmCardComponent,
        RenderPosition.BEFOREEND);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopup();
    }
  }

  _closePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetailsComponent.getElement().remove();
  }

  setDefaultView() {
    this._closePopup();
  }
}


