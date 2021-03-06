export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const EMOJI_LIST = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`
].map((emoji) => {
  return {
    value: emoji,
    src: `./images/emoji/${emoji}.png`,
  };
});

export const ELEMENTS_TO_LISTEN = [
  `.film-card__poster`,
  `.film-card__comments`,
  `.film-card__title`
];

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const FilterMarkupNames = {
  all: `All movies`,
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`
}

export const MAX_DESCRIPTION_LENGTH = 140;

export const Actions = {
  UPDATE_MOVIE: `updateMovie`,
  CREATE_NEW_COMMENT: `createNewComment`,
  DELETE_COMMENT: `deleteComment`,
  UPDATE_EMOJI: `updateEmoji`
}
