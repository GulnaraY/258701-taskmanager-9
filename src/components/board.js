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
let tasksToLoad = currentTasks;

export const createBoardLayout = () => {
  let layout;
  const tasksToRender = tasksToLoad.slice();
  tasksToLoad.splice(FIRST_TASKS_INDEX, TASCS_COUNT_IN_RENDER);
  const tasksLayout = tasksToRender.slice(FIRST_TASKS_INDEX, FIRST_TASKS_INDEX + TASCS_COUNT_IN_RENDER).map(makeTask).join(``);

  if (isFirstRender) {
    const editingTaskLayout = editingTask.map(makeEditingTask).join(``);
    layout = `<section class="board container">
    ${createSortingLayout()}
    <div class="board__tasks">
    ${editingTaskLayout}
    ${tasksLayout}
    </div>
    ${tasksToLoad.length > 0 ? createLoadMoreButtonLayout() : ``}
    </section>`;
    isFirstRender = false;
  } else {
    layout = `${tasksLayout}`;
  }
  return layout;
};

export const getTasksToLoadCount = (() => tasksToLoad.length);

