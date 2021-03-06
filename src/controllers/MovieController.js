import {Actions} from "../consts";
import {createRandomDigit} from "../utils/ulits";
import {remove, renderElement, RenderPosition} from "../utils/render";
import FilmCard from "../components/card-film";
import FilmDetails from "../components/film-details";
import {encode} from "he";

const SHAKE_ANIMATION_TIMEOUT = 600;
const NamesDeleteBtn = {
  DELETE: `Delete`,
  DELETING: `Deleting`
}

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
    this._pressedKeyCodes = new Set();
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
          this._filmData, {isWatchlist: !this._filmData.isWatchlist}), Actions.UPDATE_MOVIE);
    });

    this._filmDetailsComponent.setMarkAsWatchedHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatched: !this._filmData.isWatched}), Actions.UPDATE_MOVIE);
    });

    this._filmDetailsComponent.setAddToFavoriteHandler(() => {
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isFavorite: !this._filmData.isFavorite}), Actions.UPDATE_MOVIE);
    });

    this._filmCardComponent.setAddToWatchListHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatchlist: !this._filmData.isWatchlist}), Actions.UPDATE_MOVIE);
    });

    this._filmCardComponent.setMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isWatched: !this._filmData.isWatched}), Actions.UPDATE_MOVIE);
    });

    this._filmCardComponent.setAddToFavoriteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {isFavorite: !this._filmData.isFavorite}), Actions.UPDATE_MOVIE);
    });

    this._filmDetailsComponent.setEmojiClick((evt) => {
      if (evt.target.nodeName === `INPUT`) {
        this._onDataChange(this, this._filmData, Object.assign({},
            this._filmData,
            {commentEmoji: {
              value: evt.target.value,
              src: `./images/emoji/${evt.target.value}.png`,
            }}), Actions.UPDATE_EMOJI);
      }
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

    this._filmDetailsComponent.setDeleteCommentClick((evt) => {
      evt.preventDefault();
      const deleteBtn = evt.target;
      const commentIdToDel = evt.target.dataset.id;
      deleteBtn.innerHTML = NamesDeleteBtn.DELETING;
      deleteBtn.disabled = true;
      this._onDataChange(this, this._filmData, null, Actions.DELETE_COMMENT, commentIdToDel);
    });

    this._filmDetailsComponent.setEnterComment((evt) => {
      const newCommentForm = this._filmDetailsComponent.getElement()
        .querySelector(`.film-details__new-comment`);
      const onCmdEnterKeyUp = () => {
        this._pressedKeyCodes.clear();
        newCommentForm.removeEventListener(`keyup`, onCmdEnterKeyUp);
      };

      if (evt.key === `Meta` || evt.key === `Enter`) {
        newCommentForm.addEventListener(`keyup`, onCmdEnterKeyUp);
        this._pressedKeyCodes.add(evt.key);
        if (this._pressedKeyCodes.has(`Meta`) && this._pressedKeyCodes.has(`Enter`)) {
          evt.preventDefault();
          const textArea = newCommentForm.querySelector(`.film-details__comment-input`);
          textArea.disabled = true;
          const emojiImg = newCommentForm.querySelector(`.film-details__add-emoji-label img`);
          this._pressedKeyCodes.clear();
          const commentText = encode(textArea.value);
          const newComment = {
            text: commentText,
            emoji: {
              value: emojiImg.alt.slice(6),
              src: emojiImg.src,
            },
            author: `Some author`,
            data: new Date(),
            id: createRandomDigit(1000000, 1)
          };
          this._onDataChange(this, this._filmData, newComment, Actions.CREATE_NEW_COMMENT);
          textArea.disabled = false;
        }
      }
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
    this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__comment-input`).value = ``;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetailsComponent.getElement().remove();
  }

  setDefaultView() {
    this._closePopup();
  }

  shake() {
    this._filmDetailsComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._filmDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  onErrorInput() {
    const commentInput = this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__comment-input`);
    commentInput.disabled = false;
    commentInput.style.border = `3px solid red`;

    setTimeout(() => {
      commentInput.style.border = ``;
      commentInput.focus();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  onErrorDeleteBtn(idToDelete) {
    const deleteBtn = Array.from(document.querySelectorAll(`.film-details__comment-delete`))
      .find((it) => it.dataset.id === idToDelete);
    deleteBtn.disabled = false;
    deleteBtn.innerHTML = NamesDeleteBtn.DELETE;
  }
}


