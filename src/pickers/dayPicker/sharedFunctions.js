import _ from 'lodash';

/** Build days to fill page. */
export function buildDays(date/*moment*/, daysOnPage/*number*/) {
  const start = date.clone().startOf('month').startOf('week');
  return getDaysArray(
    start.date(),
    getBrakepoints(date),
    daysOnPage).map((date) => date.toString());
}

/** Return dates from ends of months.
 * 
 * On one datepicker's page not only days from current month are displayed
 * but also some days from adjacent months. This function returns days
 * that separate one month from other (last day in month).
 * Return array of one or two numbers.
 */
export function getBrakepoints(date/*moment*/) {
  const dateClone = date.clone();
  const currentMonth = dateClone.month();
  const brakepoints = [];

  dateClone.startOf('month').startOf('week');
  if (dateClone.month() !== currentMonth) {
    brakepoints.push(dateClone.endOf('month').date());
  }
  brakepoints.push(dateClone.endOf('month').date());
  return brakepoints;
}

/* Return array of day positions that are not disabled by default. */
export function getDefaultEnabledDayPositions(allDays/*string[]*/, date/*moment*/) {
  const dateClone = date.clone();
  const brakepoints = getBrakepoints(dateClone);
  if (brakepoints.length === 1) {
    return _.range(0, _.indexOf(allDays, brakepoints[0].toString()) + 1);
  } else {
    return _.range(
      _.indexOf(allDays, brakepoints[0].toString()) + 1,
      _.lastIndexOf(allDays, brakepoints[1].toString()) + 1
    );
  }
}

/** Return day positions that shoud be displayed as disabled. */
export function getDisabledDays(disable, maxDate, minDate, date, daysOnPage) {
  const dayPositions = _.range(daysOnPage);
  const daysInCurrentMonthPositions = getDefaultEnabledDayPositions(buildDays(date, daysOnPage), date);
  let disabledDays = dayPositions.filter((dayPosition) => !_.includes(daysInCurrentMonthPositions, dayPosition));
  if (_.isArray(disable)) {
    disabledDays = _.concat(
      disabledDays,
      disable
        .filter(date => date.year() === date.year() && date.month() === date.month())
        .map(date => date.date())
        .map(date => daysInCurrentMonthPositions[date - 1])
    );
  }
  if (!_.isNil(maxDate)) {
    if (maxDate.year() === date.year() && maxDate.month() === date.month()) {
      disabledDays = _.concat(
        disabledDays,
        _.range(1, daysInCurrentMonthPositions.length + 1).filter(date => date > maxDate.date())
          .map((date) => daysInCurrentMonthPositions[date - 1])
      );
    }
  }
  if (!_.isNil(minDate)) {
    if (minDate.year() === date.year() && minDate.month() === date.month()) {
      disabledDays = _.concat(
        disabledDays,
        _.range(1, daysInCurrentMonthPositions.length + 1).filter(date => date < minDate.date())
          .map((date) => daysInCurrentMonthPositions[date - 1])
      );
    }
  }
  return _.sortBy(_.uniq(disabledDays).filter((day) => !_.isNil(day)));
}

export function isNextPageAvailable(date, disable, maxDate) {
  return !_.some([
    isNextPageUnavailable.byDisable(date, disable),
    isNextPageUnavailable.byMaxDate(date, maxDate),
  ]);
}

export function isPrevPageAvailable(date, disable, minDate) {
  return !_.some([
    isPrevPageUnavailable.byDisable(date, disable),
    isPrevPageUnavailable.byMinDate(date, minDate),
  ]);
}

// helpers
export const isNextPageUnavailable = {
  byDisable: (currentDate/*Moment*/, disabled/*Moment[]|undefined*/) => {
    if (_.isNil(disabled)) return false;
    const twoMonthsLater = currentDate.clone();
    twoMonthsLater.add(2, 'month');
    const nextMonth = currentDate.clone();
    nextMonth.add(1, 'month');
    const allDaysFromNextMonthDisabled = _.uniq(disabled
      .filter(date => date.isBetween(currentDate, twoMonthsLater, 'month'))
      .map(date => date.date())).length === nextMonth.daysInMonth();
    if (allDaysFromNextMonthDisabled) {
      return true;
    }
    return false;
  },
  byMaxDate: (currentDate/*Moment*/, maxDate/*Moment|undefined*/) => {
    if (_.isNil(maxDate)) return false;
    const lastDayInMonth = currentDate.clone();
    lastDayInMonth.endOf('month');
    if (lastDayInMonth.isSameOrAfter(maxDate)) return true;
    return false;
  }
};

// helpers
export const isPrevPageUnavailable = {
  byDisable: (currentDate/*Moment*/, disabled/*Moment[]|undefined*/) => {
    if (_.isNil(disabled)) return false;
    const twoMonthsEarlier = currentDate.clone();
    twoMonthsEarlier.subtract(2, 'month');
    const prevMonth = currentDate.clone();
    prevMonth.subtract(1, 'month');
    const allDaysFromPrevMonthDisabled = _.uniq(disabled
      .filter(date => date.isBetween(twoMonthsEarlier, currentDate, 'month'))
      .map(date => date.date())).length === prevMonth.daysInMonth();
    if (allDaysFromPrevMonthDisabled) {
      return true;
    }
    return false;
  },
  byMinDate: (currentDate/*Moment*/, minDate/*Moment|undefined*/) => {
    if (_.isNil(minDate)) return false;
    const firstDayInMonth = currentDate.clone();
    firstDayInMonth.startOf('month');
    if (firstDayInMonth.isSameOrBefore(minDate)) return true;
    return false;
  }
};

// helper
export function getDaysArray(start/*number*/, brakepoints/*number[]*/, length) {
  let currentDay = start;
  const days = [];
  let brakepointsLeft = brakepoints.slice();

  while (! (days.length === length)) {
    days.push(currentDay);
    const bp = _.first(brakepointsLeft);
    if (currentDay === bp) {
      currentDay = 1;
      brakepointsLeft = _.slice(brakepointsLeft, 1);
    } else {
      currentDay = currentDay + 1;
    }
  }
  return days;
}
