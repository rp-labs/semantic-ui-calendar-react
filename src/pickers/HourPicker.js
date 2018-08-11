import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import HourView from '../views/HourView';

class HourPicker extends React.Component {
  /*
    Note:
      use it like this <HourPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.state = {
      /* moment instance */
      date: props.initializeWith.clone(),
    };
  }

  getActiveHour() {
    // produce active hour index
  }

  isNextPageAvailable() {
    // bool
  }

  isPrevPageAvailable() {
    // bool
  }

  getDisabledHours() {
    // produce array of indexes for HourView to consume as `disabled`
  }

  getCurrentDate() {
    // produce string for HourView to display in header
  }

  handleChange = (e, { value }) => {
    // call onChange with { year, month, day, hour }
  }

  switchToNextPage = () => {
    // shift date 1 day forward
  }

  switchToPrevPage = () => {
    //shift date 1 day backward
  }

  render() {
    return (
      <HourView />
    );
  }
}

HourPicker.propTypes = {
  /** Called after hour is selected. */
  onChange: PropTypes.func.isRequired,
  /** A value for initializing hour picker's state. */
  initializeWith: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected hour. */
  value: PropTypes.instanceOf(moment),
  /** Array of disabled hours. */
  disable: PropTypes.arrayOf(
    PropTypes.instanceOf(moment)
  ),
  /** Minimal date that could be selected. */
  minDate: PropTypes.instanceOf(moment),
  /** Maximal date that could be selected. */
  maxDate: PropTypes.instanceOf(moment),
};

export default HourPicker;
