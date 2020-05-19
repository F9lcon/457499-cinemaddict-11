import {FilterType} from "../consts";

const getFavoritesFilms = (films) => films.filter((it) => it.isFavorite);
const getHistoryFilms = (films) => films.filter((it) => it.isWatched);
const getWatchlistFilms = (films) => films.filter((it) => it.isWatchlist);


export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
  }
  return films;
};

