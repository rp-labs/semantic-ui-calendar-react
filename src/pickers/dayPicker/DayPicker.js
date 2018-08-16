import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import DayView from '../../views/DayView';
import { WEEKS_TO_DISPLAY } from '../../views/DayView';
import { getUnhandledProps } from '../../lib';
import {
  buildDays,
  getDefaultEnabledDayPositions,
  getDisabledDays,
  isNextPageAvailable,
  isPrevPageAvailable,
} from './sharedFunctions';

export const DAYS_ON_PAGE = WEEKS_TO_DISPLAY * 7;

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
    return buildDays(this.state.date, DAYS_ON_PAGE);
  }

  getActiveDay() {
    if (!_.isNil(this.props.value)) {
      const active = this.buildDays().indexOf(this.props.value.date().toString());
      if (active >= 0) {
        return active;
      }
    }
  }

  getDisabledDays() {
    const {
      disable,
      maxDate,
      minDate,
    } = this.props;
    return getDisabledDays(disable, maxDate, minDate, this.state.date, DAYS_ON_PAGE);
  }

  isNextPageAvailable() {
    const {
      disable,
      maxDate,
    } = this.props;
    return isNextPageAvailable(this.state.date, disable, maxDate);
  }

  isPrevPageAvailable() {
    const {
      disable,
      minDate,
    } = this.props;
    return isPrevPageAvailable(this.state.date, disable, minDate);
  }

  getCurrentMonth() {
    return this.state.date.format('MMMM YYYY');
  }

  handleChange = (e, { key, value }) => {
    // value is just a string like '1' or '31'
    // key represents clicked day position in array provided to DayView
    const currentMonthPositions = getDefaultEnabledDayPositions(this.buildDays(), this.state.date);
    const inCurrentMonth = _.includes(currentMonthPositions, parseInt(key));
    const inPrevMonth = parseInt(key) < currentMonthPositions[0];
    const inNextMonth = parseInt(key) > _.last(currentMonthPositions);
    const result = { year: this.state.date.year() };
    if (inCurrentMonth) {
      result.month = this.state.date.month();
    }
    if (inNextMonth) {
      result.month = this.state.date.month() + 1;
    }
    if (inPrevMonth) {
      result.month = this.state.date.month() - 1;
    }
    result.date = parseInt(value);
    _.invoke(this.props, 'onChange', e, { ...this.props, value: result });
  }

  switchToNextPage = () => {
    this.setState(({ date }) => {
      const nextDate = date.clone();
      nextDate.add(1, 'month');
      return { date: nextDate };
    });
  }

  switchToPrevPage = () => {
    this.setState(({ date }) => {
      const prevDate = date.clone();
      prevDate.subtract(1, 'month');
      return { date: prevDate };
    });
  }

  render() {
    const rest = getUnhandledProps(DayPicker, this.props);
    return (
      <DayView
        { ...rest }
        days={this.buildDays()}
        hasNextPage={this.isNextPageAvailable()}
        hasPrevPage={this.isPrevPageAvailable()}
        onNextPageBtnClick={this.switchToNextPage}
        onPrevPageBtnClick={this.switchToPrevPage}
        onDayClick={this.handleChange}
        currentDate={this.getCurrentMonth()}
        disabled={this.getDisabledDays()}
        active={this.getActiveDay()} />
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
