import {createElement} from "../utils";

const createStatFooter = (count) => {
  return `<p>${count} movies inside</p>`;
};

export default class StatFooter {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return createStatFooter(this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
