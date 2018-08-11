import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatesRangeView from '../views/DatesRangeView';

class DatesRangePicker extends React.Component {
  /*
    Note:
      use it like this <DatesRangePicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.state = {
      /* moment instance */
      date: props.initializeWith.clone(),
      /* moment instance */
      start: undefined,
      /* moment instance */
      end: undefined,
    };
  }

  buildDays() {
    /*
      build array of strings (days) for DatesRangeView to consume
    */
  }

  getActiveDays() {
    /*
      return start and end positions in object { start: number, end: number }
      (position in array returned by this.buildDays)
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
      call onChange with { start: Moment, end: Moment } if those values are not undefined yet
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
      <DatesRangeView />
    );
  }
}

DatesRangePicker.propTypes = {
  /** Called after day is selected. */
  onChange: PropTypes.func.isRequired,
  /** A value for initializing day picker's state. */
  initializeWith: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected day. */
  value: PropTypes.instanceOf(moment),
  /** Minimal date that could be selected. */
  minDate: PropTypes.instanceOf(moment),
  /** Maximal date that could be selected. */
  maxDate: PropTypes.instanceOf(moment),
};

export default DatesRangePicker;
