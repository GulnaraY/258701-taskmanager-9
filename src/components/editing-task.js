// Карточка редактирования задачи

const DaysOfWeek = {
  monday: `mo`,
  tuesday: `tu`,
  wednesday: `we`,
  thursday: `th`,
  friday: `fr`,
  saturday: `sa`,
  sunday: `su`
};

const colors = new Set([
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
]);

export const makeEditingTask = ({description, dueDay, repeatingDays, tags, color, isFavorite, isArchive}) => {
  const isRepeating = Object.keys(repeatingDays).some((day) => repeatingDays[day]);
  return `<article class="card card--edit card--${color} ${isRepeating ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive ${isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled  ${isFavorite ? `card__btn--disabled` : ``}"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${dueDay ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${new Date(dueDay).toDateString()}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                ${Object.keys(DaysOfWeek).map((day) => `<input
                class="visually-hidden card__repeat-day-input"
                type="checkbox"
                id="repeat-${DaysOfWeek[day]}-4"
                name="repeat"
                value="${DaysOfWeek[day]}"
                ${repeatingDays[DaysOfWeek[day]] ? `checked` : ``}
              />
              <label class="card__repeat-day" for="repeat-${DaysOfWeek[day]}-4"
                >${DaysOfWeek[day]}</label
              >`).join(``)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
              <input
                type="hidden"
                name="hashtag"
                value="repeat"
                class="card__hashtag-hidden-input"
              />
              <p class="card__hashtag-name">
              #${tag}
              </p>
              <button type="button" class="card__hashtag-delete">
                delete
              </button>
            </span>`).join(``)}
            </div>
              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${Array.from(colors).map((item) => `<input type="radio"
              id="color-${item}-4"
              class="card__color-input card__color-input--${item} visually-hidden"
              name="color"
              value="${item}"
              ${color === `${item}` ? `checked` : ``}
            />
            <label
              for="color-${item}-4"
              class="card__color card__color--${item}"
              >${item}</label
            >`).join(``)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};
