// Импорт
import {createMenuLayout} from './components/site-menu.js';
import {createSearchLayout} from './components/search.js';
import {createFiltersLayout} from './components/filters.js';
import {createBoardLayout} from './components/board.js';

// Функция рендеринга
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Рендер элементов на страницу
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuLayout());
render(siteMainElement, createSearchLayout());
render(siteMainElement, createFiltersLayout());
render(siteMainElement, createBoardLayout());
