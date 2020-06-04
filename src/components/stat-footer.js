import AbstractComponent from "./abstract-component";

const createStatFooter = (count) => {
  return `<p>${count} movies inside</p>`;
};

export default class StatFooter extends AbstractComponent {
  constructor(moviesModel) {
    super();
    this._count = moviesModel.getMovies().length;
  }

  getTemplate() {
    return createStatFooter(this._count);
  }
}
