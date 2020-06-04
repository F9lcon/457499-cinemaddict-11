import {remove, renderElement, RenderPosition} from "../utils/render";
import FilmCard from "../components/card-film";
import FilmDetails from "../components/film-details";
import {getRandomDate} from "../mock/film";
import {createRandomDigit} from "../mock/film";
import {encode} from "he";

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
              src: `./images/emoji/${evt.target.value}.png`,
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

    this._filmDetailsComponent.setDeleteCommentClick((evt) => {
      evt.preventDefault();
      const commentIdToDel = evt.target.dataset.id;
      this._onDataChange(this, this._filmData, Object.assign({},
          this._filmData, {comments: this._getNewComments(this._filmData.comments, commentIdToDel)}));
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
          const emojiImg = newCommentForm.querySelector(`.film-details__add-emoji-label img`);
          this._pressedKeyCodes.clear();
          const commentText = encode(newCommentForm.querySelector(`.film-details__comment-input`).value);
          const newComment = {
            text: commentText,
            emoji: {
              value: emojiImg.alt.slice(5),
              src: emojiImg.src,
            },
            author: `Some author`,
            data: getRandomDate(),
            id: createRandomDigit(1000000, 1)
          };
          this._onDataChange(this, this._filmData, Object.assign({},
              this._filmData, {comments: this._getNewComments(this._filmData.comments, null, newComment)}));
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

  _getNewComments(comments, commentIdToDel, newComment = null) {
    if (commentIdToDel) {
      return comments.filter((comment) => comment.id !== +commentIdToDel);
    }
    comments.push(newComment);
    return comments;
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
}


