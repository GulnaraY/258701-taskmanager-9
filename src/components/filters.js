// Фильтры
import {getFilters} from '../data.js';
import {getFilterLayout} from './filter.js';

export const createFiltersLayout = () => {
  const filtersLayout = getFilters().map(getFilterLayout).join(``);
  return `<section class="main__filter filter container">
  ${filtersLayout}
  </section>`;
};

