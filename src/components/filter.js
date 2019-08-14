
export const getFilterLayout = ({title, count}) => {
  return `<input
  type="radio"
  id="filter__${title}"
  class="filter__input visually-hidden"
  name="filter"
  ${(title === `all`) ? `checked` : ``}
  ${(count === 0) ? `disabled` : ``}
  />
  <label for="filter__${title}" class="filter__label">
  ${title.toUpperCase()} <span class="filter__${title}-count">${count}</span></label>`;
};

