import AbstractComponent from "./abstract-component";

const createLoadingDataPageMarckup = () => {
  return `<section class="films">
            <section class="films-list">
              <h2 class="films-list__title">Loading...</h2>
            </section>
          </section>`;
};

export default class LoadingComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingDataPageMarckup();
  }
}
