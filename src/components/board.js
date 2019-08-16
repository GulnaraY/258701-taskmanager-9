// Доска для задач
import {createSortingLayout} from './sorting.js';
import {makeTask} from './task.js';
import {createLoadMoreButtonLayout} from './load-more-button.js';
import {currentTasks} from '../data.js';
import {makeEditingTask} from './editing-task.js';
let isFirstRender = false;
export let tasksToLoad;

export const createBoardLayout = () => {
  let dataIndex = 0;
  let tasksCount = 8;
  let layout;

  if (!isFirstRender) {
    dataIndex = 1;
    tasksCount = 7;
    tasksToLoad = currentTasks;
  }
  const tasksToRender = tasksToLoad.slice();
  tasksToLoad.splice(0, 8);
  const tasksLayout = tasksToRender.slice(dataIndex, dataIndex + tasksCount).map(makeTask).join(``);

  if (!isFirstRender) {
    const editingTaskLayout = tasksToRender.slice(0, 1).map(makeEditingTask).join(``);
    layout = `<section class="board container">
    ${createSortingLayout()}
    <div class="board__tasks">
    ${editingTaskLayout}
    ${tasksLayout}
    </div>
    ${tasksToLoad.length > 0 ? createLoadMoreButtonLayout() : ``}
    </section>`;
    isFirstRender = true;
  } else {
    layout = `${tasksLayout}`;
  }
  return layout;
};
