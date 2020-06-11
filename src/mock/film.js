export default class Movie {
  constructor(moviesData, commentsData, oneMovieComments) {
    this.title = moviesData[`film_info`].title;
    this.originalTitle = moviesData[`film_info`][`alternative_title`];
    this.poster = moviesData[`film_info`].poster;
    this.writers = moviesData[`film_info`].writers;
    this.director = moviesData[`film_info`].director;
    this.actors = moviesData[`film_info`].actors.join(`, `);
    this.releaseDate = moviesData[`film_info`].release.date; // string
    this.rate = moviesData[`film_info`][`total_rating`]; // string
    this.year = moviesData[`film_info`].release.date.slice(0, 4);
    this.runTime = moviesData[`film_info`].runtime;
    this.time = `${Math.floor(moviesData[`film_info`].runtime / 60)}h ${moviesData[`film_info`].runtime % 60}min`;
    this.country = moviesData[`film_info`].release[`release_country`];
    this.genres = moviesData[`film_info`].genre;
    this.description = moviesData[`film_info`].description;
    this.ratingSystem = moviesData[`film_info`][`age_rating`];
    this.comments = commentsData ? Movie.getComments(moviesData.id, commentsData) : oneMovieComments.map(Movie.parseComment);
    this.commentEmoji = null;
    this.isWatchlist = moviesData[`user_details`].watchlist;
    this.isWatched = moviesData[`user_details`][`already_watched`];
    this.isFavorite = moviesData[`user_details`].favorite;
    this.watchingData = moviesData[`user_details`][`watching_date`];
    this.id = moviesData.id;
  }

  static parseMovie(data, commentsData, oneMovieComments) {
    return new Movie(data, commentsData, oneMovieComments);
  }

  static parseMovies(data, allComments) {
    return data.map((it) => {
      return Movie.parseMovie(it, allComments);
    });
  }

  static parseComment(data) {
    const comment = {
      text: data.comment,
      emoji: {
        value: data.emotion,
        src: `./images/emoji/${data.emotion}.png`,
      },
      author: data.author,
      data: data.date,
      id: data.id
    };
    return comment;
  }

  static parseComments(data) {
    return data.map(Movie.parseComment);
  }

  static getComments(movieId, commentsData) {
    return Movie.parseComments(commentsData[movieId]);
  }

  static parseMovieToServer(data) {
    return {
      "id": data.id,
      "comments": data.comments.map((it) => it.id),
      "film_info": {
        "title": data.title,
        "alternative_title": data.originalTitle,
        "total_rating": data.rate,
        "poster": data.poster,
        "age_rating": data.ratingSystem,
        "director": data.director,
        "writers": data.writers,
        "actors": data.actors.split(`, `),
        "release": {
          "date": data.releaseDate,
          "release_country": data.country
        },
        "runtime": data.runTime,
        "genre": data.genres,
        "description": data.description
      },
      "user_details": {
        "watchlist": data.isWatchlist,
        "already_watched": data.isWatched,
        "favorite": data.isFavorite,
        "watching_date": `2019-04-12T16:12:32.554Z`,
      }
    };
  }

  static parseCommentsToServer(data) {
    return data.map(Movie.parseCommentToServer);
  }

  static parseCommentToServer(data) {
    return {
      "id": `${data.id}`,
      "author": `Movie Buff`,
      "comment": data.text,
      "date": data.data,
      "emotion": data.emoji.value
    };
  }
}
