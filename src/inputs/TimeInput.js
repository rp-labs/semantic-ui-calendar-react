import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import InputView from '../views/InputView';
import HourPicker from '../pickers/timePicker/HourPicker';
import MinutePicker from '../pickers/timePicker/MinutePicker';
import {
  parseValue,
  parseArrayOrValue,
  getInitializer,
  TIME_FORMAT,
} from './parse';
import { getUnhandledProps } from '../lib';

function getNextMode(currentMode) {
  if (currentMode === 'hour') return 'minute';
  return 'hour';
}

function getPrevMode(currentMode) {
  if (currentMode === 'minute') return 'hour';
  return 'minute';
}

class TimeInput extends React.Component {
  /**
   * Component responsibility:
   *  - parse time input string
   *  - switch between modes ['hour', 'minute']
   *  - handle HourPicker/MinutePicker change (format { hour: number, minute: number } into output time string)
   */

  constructor(props) {
    super(props);
    this.state = {
      mode: 'hour',
    };
  }

  handleSelect = (e, { value }) => {
    const {
      hour,
      minute,
    } = value;
    const {
      timeFormat,
    } = this.props;
    let outputTimeString = '';
    if (this.state.mode === 'hour' && !_.isNil(hour)) {
      outputTimeString = moment({ hour }).format(TIME_FORMAT[timeFormat]);
    } else if (!_.isNil(hour) && !_.isNil(minute)) {
      outputTimeString = moment({ hour, minute }).format(TIME_FORMAT[timeFormat]);
    }
    _.invoke(this.props, 'onChange', e, { ...this.props, value: outputTimeString });
    this.setState((prevState) => {
      return { mode: getNextMode(prevState.mode) };
    });
  }

  getPicker() {
    const {
      value,
      timeFormat,
    } = this.props;
    const currentValue = parseValue(value, TIME_FORMAT[timeFormat]);
    const pickerProps = {
      hasHeader: false,
      initializeWith: getInitializer({ initialDate: currentValue, dateFormat: TIME_FORMAT[timeFormat] }),
      value: currentValue,
      onChange: this.handleSelect,
      timeFormat,
      key: value,
    };
    if (this.state.mode === 'hour') {
      return <HourPicker { ...pickerProps } />;
    }
    return <MinutePicker { ...pickerProps } />;
  }

  render() {
    const {
      value,
    } = this.props;
    const rest = getUnhandledProps(TimeInput, this.props);
    return (
      <InputView
        icon="time"
        { ...rest }
        value={value}>
        { this.getPicker() }
      </InputView>
    );
  }
}

TimeInput.propTypes = {
  /** Currently selected value. */
  value: PropTypes.string,
  /** One of ["24", "AMPM", "ampm"] */
  timeFormat: PropTypes.oneOf([
    '24', 'AMPM', 'ampm',
  ]),
};

TimeInput.defaultProps = {
  timeFormat: '24',
};

export default TimeInput;
