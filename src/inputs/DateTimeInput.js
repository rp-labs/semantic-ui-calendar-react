import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import InputView from '../views/InputView';
import YearPicker from '../pickers/YearPicker';
import MonthPicker from '../pickers/MonthPicker';
import DayPicker from '../pickers/dayPicker/DayPicker';
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
  if (currentMode === 'year') return 'month';
  if (currentMode === 'month') return 'day';
  if (currentMode === 'day') return 'hour';
  if (currentMode === 'hour') return 'minute';
  return 'year';
}

function getPrevMode(currentMode) {
  if (currentMode === 'minute') return 'hour';
  if (currentMode === 'hour') return 'day';
  if (currentMode === 'day') return 'month';
  if (currentMode === 'month') return 'year';
  return 'minute';
}

class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);
    /*
      state fields:
        - mode: one of [ 'year', 'month', 'day', 'hour', 'minute' ]
        - year: number
        - month: number
        - date: number
        - hour: number
        - minute: number
    */
    this.state = {
      mode: props.startMode,
    };
    const parsedValue = parseValue(props.value);
    if (parsedValue) {
      this.state.year = parsedValue.year();
      this.state.month = parsedValue.month();
      this.state.date = parsedValue.date();
      this.state.hour = parsedValue.hour();
      this.state.minute = parsedValue.minute();
    }
  }

  getDateParams() {
    /* 
      Return date params that are used for picker initialization.
      Return undefined if none of [ 'year', 'month', 'date', 'hour', 'minute' ]
      state fields defined.
    */
    const {
      year,
      month,
      date,
      hour,
      minute,
    } = this.state;
    if (!_.isNil(year) || !_.isNil(month) || !_.isNil(date) || !_.isNil(hour) || !_.isNil(minute)) {
      return { year, month, date, hour, minute };
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
      timeFormat,
    } = this.props;
    const dateTimeFormat = `${dateFormat} ${TIME_FORMAT[timeFormat]}`;
    const pickerProps = {
      hasHeader: true,
      onChange: this.handleSelect,
      onHeaderClick: this.switchToPrevMode,
      initializeWith: getInitializer({ initialDate, dateFormat: dateTimeFormat, dateParams: this.getDateParams() }),
      value: parseValue(value, dateTimeFormat),
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
    if (mode === 'day') {
      return <DayPicker key={ value } { ...pickerProps } />;
    }
    if (mode === 'hour') {
      return <HourPicker key={ value } timeFormat={ this.props.timeFormat } { ...pickerProps } />;
    }
    return <MinutePicker key={ value } timeFormat={ this.props.timeFormat } { ...pickerProps } />;
  }

  switchToNextMode = () => {
    this.setState(({ mode }) => {
      return { mode: getNextMode(mode) };
    });
  }

  switchToPrevMode = () => {
    this.setState(({ mode }) => {
      return { mode: getPrevMode(mode) };
    });
  }

  handleSelect = (e, { value }) => {
    this.setState(( prevState ) => {
      const {
        mode,
      } = prevState;
      let nextMode = mode;
      if (mode !== 'minute') {
        nextMode = getNextMode(mode);
      } else {
        const timeFormatStr = TIME_FORMAT[this.props.timeFormat];
        const outValue = moment(value).format(`${this.props.dateFormat} ${timeFormatStr}`);
        _.invoke(this.props, 'onChange', e, { ...this.props, value: outValue });
      }
      return { mode: nextMode, ...value };
    });
  }

  render() {
    const {
      value,
    } = this.props;
    const rest = getUnhandledProps(DateTimeInput, this.props);
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

DateTimeInput.propTypes = {
  /** Currently selected value. */
  value: PropTypes.string,
  /** Moment date formatting string. */
  dateFormat: PropTypes.string,
  /** Time format ["AMPM", "ampm", "24"] */
  timeFormat: PropTypes.string,
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

DateTimeInput.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24',
  startMode: 'day',
};

export default DateTimeInput;
