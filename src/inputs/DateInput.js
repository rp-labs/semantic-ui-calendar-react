import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import InputView from '../views/InputView';
import YearPicker from '../pickers/YearPicker';
import MonthPicker from '../pickers/MonthPicker';
import DayPicker from '../pickers/dayPicker/DayPicker';
import {
  parseInput,
  parseArrayOrValue,
  getInitializer,
} from './parse';
import { getUnhandledProps } from '../lib';

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    /*
      state fields:
        - mode: one of [ 'year', 'month', 'day' ]
        - year: number
        - month: number
        - date: number
    */
    this.state = {
      mode: props.startMode,
    };
  }

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

  getDateParams() {
    const {
      year,
      month,
      date,
    } = this.state;
    if (!_.isNil(year) || !_.isNil(month) || !_.isNil(date)) {
      return { year, month, date };
    }
  }

  getPicker() {
    const {
      value,
      initialDate,
      dateFormat,
      disable,
      minDate,
      maxDate,
    } = this.props;
    const pickerProps = {
      onChange: this.handleSelect,
      initializeWith: getInitializer(this.getInputValue(), initialDate, dateFormat, this.getDateParams()),
      value: parseInput(value, dateFormat),
      disable: parseArrayOrValue(disable),
      minDate: parseArrayOrValue(minDate),
      maxDate: parseArrayOrValue(maxDate),
    };
    const { mode } = this.state;
    if (mode === 'year') {
      return <YearPicker key={ value } { ...pickerProps } />;
    }
    if (mode === 'month') {
      return <MonthPicker key={ value } { ...pickerProps } />;
    }
    return <DayPicker key={ value } { ...pickerProps } />;
  }

  switchToNextMode() {
    this.setState(({ mode }) => {
      if (mode === 'year') return { mode: 'month' };
      if (mode === 'month') return { mode: 'day' };
      return { mode: 'year' };
    });
  }

  switchToPrevMode() {
    this.setState(({ mode }) => {
      if (mode === 'day') return { mode: 'month' };
      if (mode === 'month') return { mode: 'year' };
      return { mode: 'day' };
    });
  }

  handleSelect = (e, { value }) => {
    this.setState(( prevState ) => {
      const {
        mode,
      } = prevState;
      if (mode !== 'day') {
        this.switchToNextMode(); 
      } else {
        const outValue = moment(value, this.props.dateFormat);
        _.invoke(this.props, 'onChange', e, { ...this.props, value: outValue });
      }
      return value;
    });
  }

  render() {
    const {
      value,
    } = this.props;
    const rest = getUnhandledProps(DateInput, this.props);
    return (
      <InputView
        icon="calendar"
        { ...rest }
        value={value}>
        { this.getPicker() }
      </InputView>
    );
  }
}

DateInput.propTypes = {
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
  /** Display mode to start. */
  startMode: PropTypes.oneOf([
    'year', 'month', 'day',
  ]),
};

DateInput.defaultProps = {
  dateFormat: 'YYYY',
  startMode: 'day',
};

export default DateInput;