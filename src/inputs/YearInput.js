import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import InputView from '../views/InputView';
import YearPicker from '../pickers/YearPicker';
import {
  parseInput,
  parseArrayOrValue,
  getInitializer,
} from './parse';
import { getUnhandledProps } from '../lib';

class YearInput extends React.Component {
  componentDidUpdate(prevProps) {
    this.value = undefined;
    if (prevProps.value !== this.props.value) {
      this.value = this.props.value;
    }
  }

  getInputValue() {
    // only if previous this.props.value is not the same as current this.props.value
    // this.value is not undefined
    return this.value;
  }

  handleSelect = (e, { value }) => {
    const date = moment({ year: value.year });
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
    const rest = getUnhandledProps(YearInput, this.props);
    return (
      <InputView
        icon="calendar"
        { ...rest }
        value={value}>
        <YearPicker
          onChange={this.handleSelect}
          initializeWith={getInitializer(this.getInputValue(), initialDate, dateFormat)}
          value={parseInput(value, dateFormat)}
          disable={parseArrayOrValue(disable, dateFormat)}
          maxDate={parseArrayOrValue(maxDate, dateFormat)}
          minDate={parseArrayOrValue(minDate, dateFormat)} />
      </InputView>
    );
  }
}

YearInput.propTypes = {
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

YearInput.defaultProps = {
  dateFormat: 'YYYY',
};

export default YearInput;