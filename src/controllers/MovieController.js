import {renderElement, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor() {
    this._container = document.querySelector(`body`); // не очень понимаю зачем сюда передавать контейнер если он один и тот же всегда и это body
  }

  render(filmDetailsComponent) {
    const closePopup = () => {
      this._container.removeChild(filmDetailsComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closePopup();
      }
    };

    renderElement(this._container, filmDetailsComponent, RenderPosition.BEFOREEND);
    filmDetailsComponent.setClickHandler(() => {
      closePopup();
    });
    document.addEventListener(`keydown`, onEscKeyDown);
  }
}


