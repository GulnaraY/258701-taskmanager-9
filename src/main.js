// Импорт
import {createMenuLayout} from './components/site-menu.js';
import {createSearchLayout} from './components/search.js';
import {createFiltersLayout} from './components/filters.js';
import {createBoardLayout} from './components/board.js';
import {tasksToLoad} from './components/board.js';

// Функция рендеринга
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const removeElement = (container, element) => {
  container.removeChild(element);
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
    if (tasksToLoad.length === 0) {
      removeElement(board, loadMoreButton);
    }
  });

  loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
}
