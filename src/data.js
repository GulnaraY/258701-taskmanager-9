// Генерация данных
const TASKS_AMOUNT = 20;

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDay: Date.now() + Math.floor(Math.random() * (7 - -7) + -7) * 24 * 60 * 60 * 1000,
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

export const getFilters = () => {
  const filters = [];
  Object.keys(filtersMap).map((filter) => {
    return filters.push({
      title: filter,
      count: filtersCounts[filter],
    });
  });
  return filters;
};

let accumulator = {
  all: 0,
  overdue: 0,
  today: 0,
  favorites: 0,
  repeating: 0,
  tags: 0,
  archive: 0,
};

const filtersCounts = currentTasks.reduce((accum, value) => {
  if (!value.isArchive) {
    accumulator.all = accum.all + 1;
  }
  if (value.isArchive) {
    accumulator.archive = accum.archive + 1;
  }
  if (value.isFavorite) {
    accumulator.favorites = accum.favorites + 1;
  }
  if (Math.floor(value.dueDay / (24 * 60 * 60 * 1000)) === Math.floor(Date.now() / (24 * 60 * 60 * 1000))) {
    accumulator.today = accum.today + 1;
  }
  if (Math.floor(value.dueDay / (24 * 60 * 60 * 1000)) < Math.floor(Date.now() / (24 * 60 * 60 * 1000))) {
    accumulator.overdue = accum.overdue + 1;
  }
  if (Object.keys(value.repeatingDays).some((day) => value.repeatingDays[day])) {
    accumulator.repeating = accum.repeating + 1;
  }
  if (Array.from(value.tags).length) {
    accumulator.tags = accum.tags + 1;
  }
  return accumulator;
}, accumulator);

