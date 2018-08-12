import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import DayView from '../views/DayView';
import { WEEKS_IN_DAY_VIEW } from '../views/DayView';

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
    /*
      build array of strings (days) for DayView to consume
    */
  }

  getActiveDay() {
    /*
      return position of a day to display as active (number)
    */
  }

  getDisabledDays() {
    /*
      return array of day positions to display as disabled (number[])
    */
  }

  isNextPageAvailable() {
    // bool
  }

  isPrevPageAvailable() {
    // bool
  }

  getCurrentMonth() {
    /*
      produce a string for DayView to consume as currentDate
    */
  }

  handleChange = (e, { key, value }) => {
    /*  
      value is just a string like '1' or '31'
      key represents clicked day position in array provided to DayView
    */
  }

  switchToNextPage = () => {
    // shift 1 month forward
  }

  switchToPrevPage = () => {
    // shift 1 month backward
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