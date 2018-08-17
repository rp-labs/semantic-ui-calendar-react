import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import MinuteView from '../../views/MinuteView';
import { getUnhandledProps } from '../../lib';
import { buildTimeStringWithSuffix } from './sharedFunctions';

class MinutePicker extends React.Component {
  /*
    Note:
      use it like this <MinutePicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.state = {
      /* moment instance */
      date: props.initializeWith.clone(),
    };
  }

  buildMinutes() {
    const hour = this.state.date.hour() < 10? '0' + this.state.date.hour().toString() : this.state.date.hour().toString();
    return _.range(0, 60, 5)
      .map(minute => `${minute < 10? '0' : ''}${minute}`)
      .map(minute => buildTimeStringWithSuffix(hour, minute, this.props.timeFormat));
  }

  getActiveMinute() {
    // produce active minute index
  }

  isNextPageAvailable() {
    // bool
  }

  isPrevPageAvailable() {
    // bool
  }

  getCurrentDate() {
    // produce string for MinuteView to display in header
  }

  handleChange = (e, { value }) => {
    // call onChange with { year, month, day, hour, minute }
  }

  switchToNextPage = () => {
    // shift date 1 day forward
  }

  switchToPrevPage = () => {
    //shift date 1 day backward
  }

  render() {
    const rest = getUnhandledProps(MinutePicker, this.props);
    return (
      <MinuteView
        { ...rest } />
    );
  }
}

MinutePicker.propTypes = {
  /** Called after minute is selected. */
  onChange: PropTypes.func.isRequired,
  /** A value for initializing minute picker's state. */
  initializeWith: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected minute. */
  value: PropTypes.instanceOf(moment),
  /** Array of disabled dates. */
  disable: PropTypes.arrayOf(
    PropTypes.instanceOf(moment)
  ),
  /** Minimal date that could be selected. */
  minDate: PropTypes.instanceOf(moment),
  /** Maximal date that could be selected. */
  maxDate: PropTypes.instanceOf(moment),
  /** Time format. */
  timeFormat: PropTypes.oneOf([
    'ampm', 'AMPM', '24',
  ]),
};

MinutePicker.defaultProps = {
  timeFormat: '24',
};

export default MinutePicker;
