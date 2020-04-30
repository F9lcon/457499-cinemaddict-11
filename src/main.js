import Profile from "./components/profile";
import Navigator from "./components/navigator";
import StatFooter from "./components/stat-footer";
import {generateMock} from "./mock/film";
import {RenderPosition, render} from "./utils/render";
import PageController from "./controllers/page";


const FILM_COUNT = 11;
const mainElement = document.querySelector(`main`);

render(document.querySelector(`.header`), new Profile(),
    RenderPosition.BEFOREEND);
render(mainElement, new Navigator(), RenderPosition.AFTERBEGIN);
render(document.querySelector(`.footer__statistics`),
    new StatFooter(FILM_COUNT), RenderPosition.BEFOREEND);

const filmsData = generateMock(FILM_COUNT);
const board = new PageController();
board.render(filmsData);


