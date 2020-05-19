import Profile from "./components/profile";
import StatFooter from "./components/stat-footer";
import {generateMock} from "./mock/film";
import {RenderPosition, renderElement} from "./utils/render";
import PageController from "./controllers/page";
import Movies from "./models/movies";
import FilterController from "./controllers/filter";


const FILM_COUNT = 22;
const mainElement = document.querySelector(`main`);

renderElement(document.querySelector(`.header`), new Profile(),
    RenderPosition.BEFOREEND);
const filmsData = generateMock(FILM_COUNT);

const moviesModel = new Movies();

moviesModel.setMovies(filmsData);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

renderElement(document.querySelector(`.footer__statistics`),
    new StatFooter(FILM_COUNT), RenderPosition.BEFOREEND);

const pageController = new PageController(moviesModel);

// pageController.setMoviesModel(moviesModel);
pageController.render();


