// Генерация данных
const TASKS_AMOUNT = 20;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

const getRamdomElement = ((elements) => elements[Math.floor(Math.random() * elements.length)]);

const getRamdomValue = ((max, min = 0) => Math.floor(Math.random() * (max - min) + min));

const getRandomBoolean = (() => Boolean(Math.round(Math.random())));

export const getTask = () => {
  let task = {
    description: getRamdomElement([
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ]),
    repeatingDays: {
      'mo': false,
      'tu': false,
      'we': getRandomBoolean(),
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    },
    dueDay: Date.now() + getRamdomValue(7, -7) * MS_IN_DAY,
    tags: new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
    ].splice(getRamdomValue(5), getRamdomValue(3))),
    color: getRamdomElement([
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ]),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean(),
  };

  task.dueDay = !Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]) ? Date.now() + getRamdomValue(7, -7) * MS_IN_DAY : ``;
  return task;
};

const genratedTasks = new Array(TASKS_AMOUNT).fill(``).map(getTask);
export const editingTask = genratedTasks.slice(0, 1);
export const currentTasks = genratedTasks.slice(1);

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
  if (Math.floor(value.dueDay / MS_IN_DAY) === Math.floor(Date.now() / MS_IN_DAY)) {
    accumulator.today = accum.today + 1;
  }
  if (Math.floor(value.dueDay / MS_IN_DAY) < Math.floor(Date.now() / MS_IN_DAY)) {
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

