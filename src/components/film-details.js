import {EMOJI_LIST} from "../consts";
import AbstractSmartComponent from "./abstract-smart-component";

const createFilmDetails = ({title, originalTitle, poster, actors, director,
  writers, releaseDate, country, rate, time, genres, description, ratingSystem,
  comments, isWatchlist, isWatched, isFavorite, commentEmoji}) => {
  const getEmoji = (commentEmojiData) => {
    if (commentEmojiData) {
      return `<img src="${commentEmojiData.src}" data-id="${commentEmojiData.id}" width="55" height="55" alt="emoji-${commentEmojiData.value}">`;
    } else {
      return ``;
    }
  };

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ratingSystem}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rate}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${time}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(``)}
                </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">${comments.length !== 1 ? `Comments` : `Comment`} <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${comments.map((comment) => {
    const {text, emoji, author, data, id} = comment;
    return (`<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                <img src="${emoji.src}" width="55" height="55" alt="emoji-${emoji.value}">
                </span>
                <div>
                <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">
                ${new Date(data).getFullYear()}/${new Date(data).getMonth()}/${new Date(data).getDay()} ${new Date(data).getHours()}:${new Date(data).getMinutes()}</span>
              <button class="film-details__comment-delete" data-id="${id}">Delete</button>
                < /p>
                </div>
                </li>`);
  }).join(``)
}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            ${getEmoji(commentEmoji)}

          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${EMOJI_LIST.map((emoji) => {
    return (`
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.value}" value="${emoji.value}">
                <label class="film-details__emoji-label" for="emoji-${emoji.value}">
                  <img src="${emoji.src}" data-id="123" width="30" height="30" alt="emoji-${emoji.value}">
                </label>
              `);
  }).join(``)
}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeBtnClickHandler = null;
    this._addToWatchListHandler = null;
    this._markAsWatchedHandler = null;
    this._addToFavoriteHandler = null;
    this._setEmojiClick = null;
    this._onCommentDeleteHandler = null;
    this._onCommentEnter = null;
  }

  set film(data) {
    this._film = data;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }


  getTemplate() {
    return createFilmDetails(this._film);
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeBtnClickHandler);
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, this._addToWatchListHandler);
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, this._markAsWatchedHandler);
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, this._addToFavoriteHandler);
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._setEmojiClick);

    const elements = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    if (elements.length) {
      elements.forEach((element) => element.addEventListener(`click`, this._onCommentDeleteHandler));
    }
    this.getElement().querySelector(`.film-details__new-comment`)
      .addEventListener(`keydown`, this._onCommentEnter);
  }

  setCloseBtnHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeBtnClickHandler = handler;
  }

  setAddToWatchListHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
    this._addToWatchListHandler = handler;
  }

  setMarkAsWatchedHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
    this._markAsWatchedHandler = handler;
  }

  setAddToFavoriteHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
    this._addToFavoriteHandler = handler;
  }

  setEmojiClick(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, handler);
    this._setEmojiClick = handler;
  }

  setDeleteCommentClick(handler) {
    const elements = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    if (elements.length) {
      elements.forEach((element) => element.addEventListener(`click`, handler));
    }
    this._onCommentDeleteHandler = handler;
  }

  setEnterComment(handler) {
    this.getElement().querySelector(`.film-details__new-comment`)
      .addEventListener(`keydown`, handler);
    this._onCommentEnter = handler;
  }
}
