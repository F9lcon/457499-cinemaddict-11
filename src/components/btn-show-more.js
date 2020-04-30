import AbstractComponent from "./abstract-component";

const createBtnShowMore = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createBtnShowMore();
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }
}

