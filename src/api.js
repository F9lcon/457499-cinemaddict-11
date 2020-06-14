import Movie from "./mock/film";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

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
    this._url = `https://11.ecmascript.pages.academy/cinemaddict/`;
  }

  getMovies() {
    return this._load({endPoint: `movies`})
      .then((response) => response.json());
  }

  getComments(movieId) {
    return this._load({endPoint: `comments/${movieId}`})
      .then((response) => response.json());
  }

  updateMovie(movieId, data) {
    return this._load({endPoint: `movies/${movieId}`,
      method: Method.PUT,
      headers: new Headers({"Content-Type": `application/json`}),
      body: JSON.stringify(Movie.parseMovieToServer(data))
    })
      .then((response) => response.json())
      .then((movieData) => {
        return this.getComments(movieId)
          .then((commentsData) => {
            return Movie.parseMovie(movieData, null, commentsData);
          });
      });
  }

  createComment(movieId, data) {
    return this._load({endPoint: `comments/${movieId}`,
      method: Method.POST,
      headers: new Headers({"Content-Type": `application/json`}),
      body: JSON.stringify(Movie.parseCommentToServer(data))
    })
      .then((response) => response.json())
      .then((movieData) => Movie.parseMovie(movieData.movie, null, movieData.comments));
  }

  deleteComment(movieId, commentId) {
    return this._load({endPoint: `comments/${commentId}`, method: Method.DELETE})
      .then(() => this.getComments(movieId))
      .then((updatedComments) => Movie.parseComments(updatedComments));
  }

  _load({endPoint, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);


    return fetch(`${this._url}${endPoint}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;


