import {FilterType} from "../consts";
import Filter from "../components/filter";
import {renderElement, replace} from "../utils/render";
import {RenderPosition} from "../utils/render";
import {FilterMarkupNames} from "../consts";
import {getFilmsByFilter} from "../utils/filter";

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._activeFilter = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._model.setDataChangeHandler(this._onDataChange);

  }

  render() {
    const container = this._container;
    const allFilms = this._model.getAllMovies();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilter,
        markupName: FilterMarkupNames[filterType],
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new Filter(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);


    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      renderElement(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }

  }

  _onFilterChange(filterType) {
    this._model.setFilterType(filterType);
    this._activeFilter = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }

}

