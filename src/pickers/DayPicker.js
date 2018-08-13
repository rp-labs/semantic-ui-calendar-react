import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import DayView from '../views/DayView';
import { WEEKS_TO_DISPLAY } from '../views/DayView';

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

/** Return maximum 2 brakepoints. */
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

/*
  return array of day positions that are not disabled by default
*/
export function getAnabledOnlyPositions(allDays/*string[]*/, date/*moment*/) {
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

class DayPicker extends React.Component {
  /*
    Note:
      use it like this <DayPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.state = {
      /* moment instance */
      date: props.initializeWith.clone(),
    };
  }

  buildDays() {
    const brakepoints = getBrakepoints(this.state.date);
    const start = this.state.date.clone().startOf('month').startOf('week');
    return getDaysArray(start.date(), brakepoints, WEEKS_TO_DISPLAY * 7).map((date) => date.toString());
  }

  getActiveDay() {
    if (!_.isNil(this.props.value)) {
      const active = this.buildDays().indexOf(this.props.value.date().toString());
      if (active >= 0) {
        return active;
      }
    }
  }

  getDisabledDays() {
    const {
      disable,
      maxDate,
      minDate,
    } = this.props;
    const dayPositions = _.range(WEEKS_TO_DISPLAY * 7);
    const daysInCurrentMonthPositions = getAnabledOnlyPositions(this.buildDays(), this.state.date);
    let disabledDays = dayPositions.filter((dayPosition) => !_.includes(daysInCurrentMonthPositions, dayPosition));
    if (_.isArray(disable)) {
      disabledDays = _.concat(
        disabledDays,
        disable
          .filter(date => date.year() === this.state.date.year() && date.month() === this.state.date.month())
          .map(date => date.date())
          .map(date => daysInCurrentMonthPositions[date - 1])
      );
    }
    if (!_.isNil(maxDate)) {
      if (maxDate.year() === this.state.date.year() && maxDate.month() === this.state.date.month()) {
        disabledDays = _.concat(
          disabledDays,
          _.range(1, daysInCurrentMonthPositions.length + 1).filter(date => date > maxDate.date())
            .map((date) => daysInCurrentMonthPositions[date - 1])
        );
      }
    }
    if (!_.isNil(minDate)) {
      if (minDate.year() === this.state.date.year() && minDate.month() === this.state.date.month()) {
        disabledDays = _.concat(
          disabledDays,
          _.range(1, daysInCurrentMonthPositions.length + 1).filter(date => date < minDate.date())
            .map((date) => daysInCurrentMonthPositions[date - 1])
        );
      }
    }
    return _.sortBy(_.uniq(disabledDays).filter((day) => !_.isNil(day)));
  }

  isNextPageAvailable() {
    return !_.some([
      isNextPageUnavailable.byDisable(this.state.date, this.props.disable),
      isNextPageUnavailable.byMaxDate(this.state.date, this.props.maxDate),
    ]);
  }

  isPrevPageAvailable() {
    return !_.some([
      isPrevPageUnavailable.byDisable(this.state.date, this.props.disable),
      isPrevPageUnavailable.byMinDate(this.state.date, this.props.minDate),
    ]);
  }

  getCurrentMonth() {
    return this.state.date.format('MMMM YYYY');
  }

  handleChange = (e, { key, value }) => {
    // value is just a string like '1' or '31'
    // key represents clicked day position in array provided to DayView
    const currentMonthPositions = getAnabledOnlyPositions(this.buildDays(), this.state.date);
    const inCurrentMonth = _.includes(currentMonthPositions, parseInt(key));
    const inPrevMonth = parseInt(key) < currentMonthPositions[0];
    const inNextMonth = parseInt(key) > _.last(currentMonthPositions);
    const result = { year: this.state.date.year() };
    if (inCurrentMonth) {
      result.month = this.state.date.month();
    }
    if (inNextMonth) {
      result.month = this.state.date.month() + 1;
    }
    if (inPrevMonth) {
      result.month = this.state.date.month() - 1;
    }
    result.date = parseInt(value);
    _.invoke(this.props, 'onChange', e, { ...this.props, value: result });
  }

  switchToNextPage = () => {
    this.setState(({ date }) => {
      const nextDate = date.clone();
      nextDate.add(1, 'month');
      return { date: nextDate };
    });
  }

  switchToPrevPage = () => {
    this.setState(({ date }) => {
      const prevDate = date.clone();
      prevDate.subtract(1, 'month');
      return { date: prevDate };
    });
  }

  render() {
    return (
      <DayView />
    );
  }
}

DayPicker.propTypes = {
  /** Called after day is selected. */
  onChange: PropTypes.func.isRequired,
  /** A value for initializing day picker's state. */
  initializeWith: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected day. */
  value: PropTypes.instanceOf(moment),
  /** Array of disabled days. */
  disable: PropTypes.arrayOf(
    PropTypes.instanceOf(moment)
  ),
  /** Minimal date that could be selected. */
  minDate: PropTypes.instanceOf(moment),
  /** Maximal date that could be selected. */
  maxDate: PropTypes.instanceOf(moment),
};

export default DayPicker;
