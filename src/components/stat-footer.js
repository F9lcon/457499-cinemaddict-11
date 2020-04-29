import AbstractComponent from "./abstract-component";

const createStatFooter = (count) => {
  return `<p>${count} movies inside</p>`;
};

export default class StatFooter extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createStatFooter(this._count);
  }
}
