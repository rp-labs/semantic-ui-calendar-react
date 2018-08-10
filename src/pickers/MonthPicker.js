import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import MonthView from '../views/MonthView';
import { getUnhandledProps } from '../lib';

const MONTHS_IN_YEAR = 12;
const isNextPageUnavailable = {
  byDisable: (currentDate/*Moment*/, disabledMonths/*Moment[]|undefined*/) => {
    if (_.isNil(disabledMonths)) return false;
    const allMonthsFromNextYearDisabled = _.uniq(disabledMonths
      .filter(month => month.year() === currentDate.year() + 1)
      .map(month => month.month())).length === 12;
    if (allMonthsFromNextYearDisabled) {
      return true;
    }
    return false;
  },
  byMaxDate: (currentDate/*Moment*/, maxDate/*Moment|undefined*/) => {
    if (_.isNil(maxDate)) return false;
    if (currentDate.year() >= maxDate.year()) return true;
    return false;
  }
};

const isPrevPageUnavailable = {
  byDisable: (currentDate/*Moment*/, disabledMonths/*Moment[]|undefined*/) => {
    if (_.isNil(disabledMonths)) return false;
    const allMonthsFromPrevYearDisabled = _.uniq(disabledMonths
      .filter(month => month.year() === currentDate.year() - 1)
      .map(month => month.month())).length === 12;
    if (allMonthsFromPrevYearDisabled) {
      return true;
    }
    return false;
  },
  byMinDate: (currentDate/*Moment*/, minDate/*Moment|undefined*/) => {
    if (_.isNil(minDate)) return false;
    if (currentDate.year() <= minDate.year()) return true;
    return false;
  }
};

class MonthPicker extends React.Component {
  /*
    Note:
      use it like this <MonthPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.state = {
      /* moment instance */
      date: props.initializeWith.clone(),
    };
  }

  buildMonths() {
    return moment.monthsShort();
  }

  getActiveMonth() {
    if (!_.isNil(this.props.value)) {
      if (this.props.value.year() === this.state.date.year()) {
        return this.props.value.month();
      }
    }
  }

  getDisabledMonths() {
    let disabled = [];
    if (_.isArray(this.props.disable)) {
      disabled = disabled.concat(
        this.props.disable
          .filter(monthMoment => monthMoment.year() === this.state.date.year())
          .map(monthMoment => monthMoment.month())
      );
    }
    if (!_.isNil(this.props.maxDate)) {
      if (this.props.maxDate.year() === this.state.date.year()) {
        disabled = disabled.concat(
          _.range(this.props.maxDate.month() + 1, MONTHS_IN_YEAR)
        );
      }
      if (this.props.maxDate.year() < this.state.date.year()) {
        disabled = _.range(0, MONTHS_IN_YEAR);
      }
    }
    if (!_.isNil(this.props.minDate)) {
      if (this.props.minDate.year() === this.state.date.year()) {
        disabled = disabled.concat(
          _.range(0, this.props.minDate.month())
        );
      }
      if (this.props.minDate.year() > this.state.date.year()) {
        disabled = _.range(0, MONTHS_IN_YEAR);
      }
    }
    if (disabled.length > 0) {
      return _.uniq(disabled);
    }
  }

  isNextPageAvailable() {
    const {
      maxDate,
      disable,
    } = this.props;
    return !_.some([
      isNextPageUnavailable.byDisable(this.state.date, disable),
      isNextPageUnavailable.byMaxDate(this.state.date, maxDate),
    ]);
  }

  isPrevPageAvailable() {
    const {
      minDate,
      disable,
    } = this.props;
    return !_.some([
      isPrevPageUnavailable.byDisable(this.state.date, disable),
      isPrevPageUnavailable.byMinDate(this.state.date, minDate),
    ]);
  }

  getCurrentYear() {
    return this.state.date.year().toString();
  }

  handleChange = (e, { value }) => {
    const year = parseInt(this.getCurrentYear());
    const month = this.buildMonths().indexOf(value);
    _.invoke(this.props, 'onChange', e, { ...this.props, value: { year, month } });
  }

  switchToNextPage = () => {
    this.setState(({ date }) => {
      const nextDate = date.clone();
      nextDate.add(1, 'year');
      return { date: nextDate };
    });
  }

  switchToPrevPage = () => {
    this.setState(({ date }) => {
      const prevDate = date.clone();
      prevDate.subtract(1, 'year');
      return { date: prevDate };
    });
  }

  render() {
    const rest = getUnhandledProps(MonthPicker, this.props);
    return (
      <MonthView
        { ...rest }
        months={this.buildMonths()}
        onMonthClick={this.handleChange}
        onNextPageBtnClick={this.switchToNextPage}
        onPrevPageBtnClick={this.switchToPrevPage}
        hasPrevPage={this.isPrevPageAvailable()}
        hasNextPage={this.isNextPageAvailable()}
        disabled={this.getDisabledMonths()}
        active={this.getActiveMonth()}
        currentYear={this.getCurrentYear()} />
    );
  }
}

MonthPicker.propTypes = {
  /** Called after month is selected. */
  onChange: PropTypes.func.isRequired,
  /** A value for initializing moment picker's state. */
  initializeWith: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected month. */
  value: PropTypes.instanceOf(moment),
  /** Array of disabled months. */
  disable: PropTypes.arrayOf(
    PropTypes.instanceOf(moment)
  ),
  /** Minimal month that could be selected. */
  minDate: PropTypes.instanceOf(moment),
  /** Maximal month that could be selected. */
  maxDate: PropTypes.instanceOf(moment),
};

export default MonthPicker;
