// Импорт
import {createMenuLayout} from './components/site-menu.js';
import {createSearchLayout} from './components/search.js';
import {createFiltersLayout} from './components/filters.js';
import {createBoardLayout} from './components/board.js';
import {getTasksToLoadCount} from './components/board.js';

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

const loadMoreButton = siteMainElement.querySelector(`.load-more`);
if (loadMoreButton) {
  const board = siteMainElement.querySelector(`.board`);
  const boardTasks = board.querySelector(`.board__tasks`);
  const onLoadMoreButtonClick = (() => {
    render(boardTasks, createBoardLayout());
    if (getTasksToLoadCount() === 0) {
      loadMoreButton.remove();
    }
  });

  loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
}
