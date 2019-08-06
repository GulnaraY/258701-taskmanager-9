'use strict';

(function () {
  const VISUALLY_HIDDEN = `visually-hidden`;
  const mainContainer = document.querySelector(`main.main`);
  const renderElement = (container, layout) => {
    container.appendChild(layout);
  };

  const createMenuLayout = () => {
    const controlPanel = document.querySelector(`.main__control`);
    const menu = document.createElement(`section`);
    let menuFragment = document.createDocumentFragment();
    menu.classList.add(`control__btn-wrap`);
    const newTaskControl = document.createElement(`input`);
    newTaskControl.name = `control`;
    newTaskControl.type = `radio`;
    newTaskControl.id = `control__new-task`;
    newTaskControl.className = `control__input visually-hidden`;
    const newTaskControlLabel = document.createElement(`label`);
    newTaskControlLabel.setAttribute(`for`, `control__new-task`);
    newTaskControlLabel.className = `control__label control__label--new-task`;
    newTaskControlLabel.textContent = `+ ADD NEW TASK`;
    menuFragment.appendChild(newTaskControl);
    menuFragment.appendChild(newTaskControlLabel);

    const taskControl = newTaskControl.cloneNode();
    taskControl.id = `control__task`;
    taskControl.checked = true;
    const taskControlLabel = newTaskControlLabel.cloneNode();
    taskControlLabel.setAttribute(`for`, `control__task`);
    taskControlLabel.className = `control__label`;
    taskControlLabel.textContent = `TASKS`;
    menuFragment.appendChild(taskControl);
    menuFragment.appendChild(taskControlLabel);

    const statistics = newTaskControl.cloneNode();
    statistics.id = `control__statistic`;
    const statisticsLabel = newTaskControlLabel.cloneNode();
    statisticsLabel.setAttribute(`for`, `control__statistic`);
    statisticsLabel.className = `control__label`;
    statisticsLabel.textContent = `STATISTICS`;
    menuFragment.appendChild(statistics);
    menuFragment.appendChild(statisticsLabel);

    menu.appendChild(menuFragment);
    renderElement(controlPanel, menu);
  };

  const createSearchLayout = () => {
    const searchContainer = document.createElement(`section`);
    searchContainer.className = `main__search search container`;
    const searchFragment = document.createDocumentFragment();
    const search = document.createElement(`input`);
    search.type = `text`;
    search.id = `search__input`;
    search.className = `search__input`;
    search.placeholder = `START TYPING — SEARCH BY WORD, #HASHTAG OR DATE`;
    const searchLabel = document.createElement(`input`);
    searchLabel.setAttribute(`for`, `search__input`);
    searchLabel.className = VISUALLY_HIDDEN;
    searchLabel.textContent = `Search`;
    searchFragment.appendChild(search);
    searchFragment.appendChild(searchLabel);
    searchContainer.appendChild(searchFragment);
    renderElement(mainContainer, searchContainer);
  };
  createMenuLayout();
  createSearchLayout();
})();
