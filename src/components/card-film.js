export const createCardFilm = (film) => {
  const {title, poster, rate, year, time, genre, description, comments} = film;
  return (`
  <article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rate}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${time}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length < 140 ? description : `${description.slice(0, 140)}...`}</p>
          <a class="film-card__comments">${comments.length}  ${comments.length === 0 || comments.length > 1 ? `comments` : `comment`}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
   </article>
  `);
};

