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
    src: `./images/emoji/${emoji}.png`
  };
});

export const ELEMENTS_TO_LISTEN = [
  `.film-card__poster`,
  `.film-card__comments`,
  `.film-card__title`
];
