import AbstractComponent from "./abstract-component";

const createFilterMarkup = (filter, isAllFilter) => {
  return `<a href="#${filter.name}" data-id="${filter.name}" class="main-navigation__item ${filter.checked ? `main-navigation__item--active` : `` }">${filter.markupName}
${!isAllFilter ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}</a>`;
};

const createTemplateFilters = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return createTemplateFilters(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.nodeName === `A`) {
        const filterName = evt.target.dataset.id;
        handler(filterName);
      }
    });
  }

}
