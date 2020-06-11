import Movie from "./mock/film";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }
  getMovies() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`,
        {headers})
      .then((response) => response.json());
  }

  getComments(movieId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`,
        {headers})
      .then((response) => response.json());
  }

  updateMovie(movieId, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);


    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${movieId}`,
        {
          method: `PUT`,
          body: JSON.stringify(Movie.parseMovieToServer(data)),
          headers
        })
      .then(checkStatus)
      .then((response) => response.json())
      .then((movieData) => {
        return this.getComments(movieId)
          .then((commentsData) => {
            return Movie.parseMovie(movieData, null, commentsData);
          });
      });
  }

  createComment(movieId, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${movieId}`,
        {
          method: `POST`,
          body: JSON.stringify(Movie.parseCommentToServer(data)),
          headers
        })
      .then(checkStatus)
      .then((response) => response.json())
      .then((movieData) => Movie.parseMovie(movieData.movie, null, movieData.comments));
  }

  deleteComment(movieId, commentId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${commentId}`,
        {
          method: `DELETE`,
          headers})
      .then(() => this.getComments(movieId))
      .then((updatedComments) => Movie.parseComments(updatedComments))
  }

};

export default API;

// рефактор методов

