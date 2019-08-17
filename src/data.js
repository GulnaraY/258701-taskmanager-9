// Генерация данных
const TASKS_AMOUNT = 20;

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDay: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ].splice(Math.floor(Math.random() * 5), Math.round(Math.random() * 3))),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const currentTasks = new Array(TASKS_AMOUNT).fill(``).map(getTask);

const filtersMap = {
  all: `isArchive`,
  overdue: `dueDay`,
  today: `dueDay`,
  favorites: `isFavorite`,
  repeating: `repeatingDays`,
  tags: `tags`,
  archive: `isArchive`,
};

const getFilteredDataCount = ((filter) => {
  let filteredTasksCount;
  const filterValue = filtersMap[filter];
  if (filter === `all`) {
    filteredTasksCount = currentTasks.filter((it) => !it[filterValue]).length;
  }
  if ((filter === `archive`) || (filter === `favorites`)) {
    filteredTasksCount = currentTasks.filter((it) => it[filterValue]).length;
  }
  if (filter === `tags`) {
    filteredTasksCount = currentTasks.filter((it) => Boolean(Array.from(it[filterValue]).length)).length;
  }
  if (filter === `today`) {
    filteredTasksCount = currentTasks.filter((it) => it[filterValue] === Date.now()).length;
  }
  if (filter === `overdue`) {
    filteredTasksCount = currentTasks.filter((it) => it[filterValue] < Date.now()).length;
  }
  if (filter === `repeating`) {
    filteredTasksCount = currentTasks.filter((it) => Object.keys(it[filterValue]).some((day) => it[filterValue][day])).length;
  }
  return filteredTasksCount;
});

export const getFilters = () => {
  const filters = [];
  Object.keys(filtersMap).map((filter) => {
    return filters.push({
      title: filter,
      count: getFilteredDataCount(filter),
    });
  });
  return filters;
};


