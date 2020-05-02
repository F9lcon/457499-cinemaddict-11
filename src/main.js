import Profile from "./components/profile";
import Navigator from "./components/navigator";
import StatFooter from "./components/stat-footer";
import {generateMock} from "./mock/film";
import {RenderPosition, renderElement} from "./utils/render";
import PageController from "./controllers/page";


const FILM_COUNT = 22;
const mainElement = document.querySelector(`main`);

renderElement(document.querySelector(`.header`), new Profile(),
    RenderPosition.BEFOREEND);
renderElement(mainElement, new Navigator(), RenderPosition.AFTERBEGIN);
renderElement(document.querySelector(`.footer__statistics`),
    new StatFooter(FILM_COUNT), RenderPosition.BEFOREEND);

const filmsData = generateMock(FILM_COUNT);
const board = new PageController();
board.render(filmsData);


