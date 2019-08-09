// Импорт
import {createMenuLayout} from './components/site-menu.js';
import {createSearchLayout} from './components/search.js';
import {createFiltersLayout} from './components/filters.js';
import {createBoardLayout} from './components/board.js';
import {createSortingLayout} from './components/sorting.js';
import {createTaskEditLayout} from './components/editing-task.js';
import {createTaskLayout} from './components/task.js';
import {createLoadMoreButtonLayout} from './components/load-more-button.js';

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

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingLayout(), `afterbegin`);
render(taskListElement, createTaskEditLayout());

new Array(3).fill(``).forEach(() => render(taskListElement, createTaskLayout()));

render(boardElement, createLoadMoreButtonLayout());
