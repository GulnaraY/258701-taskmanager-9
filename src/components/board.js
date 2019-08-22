// Доска для задач
import {createSortingLayout} from './sorting.js';
import {makeTask} from './task.js';
import {createLoadMoreButtonLayout} from './load-more-button.js';
import {currentTasks} from '../data.js';
import {makeEditingTask} from './editing-task.js';
import {editingTask} from '../data.js';

const TASCS_COUNT_IN_RENDER = 8;
const FIRST_TASKS_INDEX = 0;
let isFirstRender = true;
let renderCount = 0;

export const createBoardLayout = () => {
  let layout;

  const tasksToRender = currentTasks.slice(FIRST_TASKS_INDEX + renderCount * TASCS_COUNT_IN_RENDER, TASCS_COUNT_IN_RENDER + renderCount * TASCS_COUNT_IN_RENDER);
  const tasksLayout = tasksToRender.slice(FIRST_TASKS_INDEX, FIRST_TASKS_INDEX + TASCS_COUNT_IN_RENDER).map(makeTask).join(``);
  renderCount++;

  if (isFirstRender) {
    const editingTaskLayout = editingTask.map(makeEditingTask).join(``);
    layout = `<section class="board container">
    ${createSortingLayout()}
    <div class="board__tasks">
    ${editingTaskLayout}
    ${tasksLayout}
    </div>
    ${getTasksToLoadCount() > 0 ? createLoadMoreButtonLayout() : ``}
    </section>`;
    isFirstRender = false;
  } else {
    layout = `${tasksLayout}`;
  }
  return layout;
};

export const getTasksToLoadCount = (() => currentTasks.slice(FIRST_TASKS_INDEX + renderCount * TASCS_COUNT_IN_RENDER, TASCS_COUNT_IN_RENDER + renderCount * TASCS_COUNT_IN_RENDER).length);

