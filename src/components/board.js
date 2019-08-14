// Доска для задач
import {createSortingLayout} from './sorting.js';
import {createTaskEditLayout} from './editing-task.js';
import {makeTask} from './task.js';
import {createLoadMoreButtonLayout} from './load-more-button.js';
import {currentTasks} from '../data.js';

export const createBoardLayout = () => {
  const tasksLayout = currentTasks.map(makeTask).join(``);
  return `<section class="board container">
  ${createSortingLayout()}
    <div class="board__tasks">
    ${createTaskEditLayout()}
    ${tasksLayout}
    </div>
    ${createLoadMoreButtonLayout()}
  </section>`;
};
