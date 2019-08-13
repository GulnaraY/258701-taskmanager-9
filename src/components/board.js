// Доска для задач

import {createSortingLayout} from './sorting.js';
import {createTaskEditLayout} from './editing-task.js';
import {makeTask} from './task.js';
import {createLoadMoreButtonLayout} from './load-more-button.js';
import {getTask} from '../data.js';


const TASKS_AMOUNT = 3;

export const createBoardLayout = () => {
  const tasksLayout = new Array(TASKS_AMOUNT).fill(``).map(getTask).map(makeTask).join(``);
  return `<section class="board container">
  ${createSortingLayout()}
    <div class="board__tasks">
    ${createTaskEditLayout()}
    ${tasksLayout}
    </div>
    ${createLoadMoreButtonLayout()}
  </section>`;
};
