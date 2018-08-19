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
        - day: number
    */
  }

  getPicker() {
    return <div></div>;
  }

  switchToNextMode() {
    // change mode state firld to next one
  }

  switchToPrevMode() {
    // change mode state firld to previous one
  }

  handleSelect = (e, { value }) => {
    /*
      1) Set new state

      2) Check if ready to produce value (ready if mode is `day`)

        yes) parse { year, month, day: value }, invoke onChange with string
        no) do nothing
    */

    // const date = moment({ year: value.year });
    // let output = '';
    // if (date.isValid()) {
    //   output = date.format(this.props.dateFormat);
    // }
    // _.invoke(
    //   this.props,
    //   'onChange',
    //   e, { ...this.props, value: output });
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
};

DateInput.defaultProps = {
  dateFormat: 'YYYY',
};

export default DateInput;
