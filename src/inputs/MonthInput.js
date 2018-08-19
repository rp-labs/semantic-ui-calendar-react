import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import InputView from '../views/InputView';
import MonthPicker from '../pickers/MonthPicker';
import {
  parseInput,
  parseArrayOrValue,
  getInitializer,
} from './parse';
import { getUnhandledProps } from '../lib';

class MonthInput extends React.Component {
  handleSelect = (e, { value }) => {
    const date = moment({ month: value.month });
    let output = '';
    if (date.isValid()) {
      output = date.format(this.props.dateFormat);
    }
    _.invoke(
      this.props,
      'onChange',
      e, { ...this.props, value: output });
  }

  render() {
    const {
      value,
      disable,
      maxDate,
      minDate,
      initialDate,
      dateFormat,
    } = this.props;
    const rest = getUnhandledProps(MonthInput, this.props);
    return (
      <InputView
        icon="calendar"
        { ...rest }
        value={value}>
        <MonthPicker
          onChange={this.handleSelect}
          initializeWith={getInitializer(value, initialDate, dateFormat)}
          value={parseInput(value, dateFormat)}
          disable={parseArrayOrValue(disable, dateFormat)}
          maxDate={parseArrayOrValue(maxDate, dateFormat)}
          minDate={parseArrayOrValue(minDate, dateFormat)} />
      </InputView>
    );
  }
}

MonthInput.propTypes = {
  /** Currently selected value. */
  value: PropTypes.string,
  /** Moment date formatting string. */
  dateFormat: PropTypes.string,
  /** Date to display initially when no date is selected. */
  initialDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
  ]),
  /** Date or list of dates that are displayed as disabled. */
  disable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.instanceOf(moment),
    PropTypes.arrayOf(PropTypes.instanceOf(moment)),
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  /** Maximum date that can be selected. */
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
  ]),
  /** Minimum date that can be selected. */
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
  ]),
};

MonthInput.defaultProps = {
  dateFormat: 'MMM',
};

export default MonthInput;
