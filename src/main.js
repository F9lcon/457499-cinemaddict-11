import API from "./api";
import FilterController from "./controllers/filter";
import Movie from "./mock/film";
import Movies from "./models/movies";
import PageController from "./controllers/page";
import Profile from "./components/profile";
import {RenderPosition, renderElement} from "./utils/render";
import StatFooter from "./components/stat-footer";

const AUTHORIZATION = `Basic eo0v590ik29889a`;
let isLoading = true;


const api = new API(AUTHORIZATION);

const moviesModel = new Movies();


renderElement(document.querySelector(`.header`), new Profile(),
    RenderPosition.BEFOREEND);

const pageController = new PageController(moviesModel, api);

const filterController = new FilterController(document
  .querySelector(`main`), moviesModel);
filterController.render();
pageController.render(isLoading);

let moviesArr = [];
let moviesId = [];
api.getMovies()
  .then((movies) => {
    moviesArr = movies;
    moviesId = movies.map((it) => it.id);
    Promise.all(moviesId.map((id) => api.getComments(id)))
      .then((allComments) => {
        isLoading = true;
        moviesModel.setMovies(Movie.parseMovies(moviesArr, allComments));
        filterController.render();
        pageController.render();
        renderElement(document.querySelector(`.footer__statistics`),
            new StatFooter(moviesModel), RenderPosition.BEFOREEND);
      })
      .catch(() => {
        moviesModel.setMovies([]);
        pageController.render();
        renderElement(document.querySelector(`.footer__statistics`),
            new StatFooter(moviesModel), RenderPosition.BEFOREEND);
      });
  });
