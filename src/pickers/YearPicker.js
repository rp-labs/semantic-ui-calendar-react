import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import YearView from '../views/YearView';
import { getUnhandledProps } from '../lib';

const YEARS_ON_PAGE = 3 * 4;

const isNextPageUnavailable = {
  byDisable: (lastOnPage/*number*/, disabledYears/*number[]|undefined*/) => {
    if (_.isNil(disabledYears)) return false;
    const firstOnNext = lastOnPage + 1;
    return _.every(_.range(firstOnNext, firstOnNext + YEARS_ON_PAGE), year => disabledYears.indexOf(year) >= 0);
  },
  byMaxDate: (lastOnPage/*number*/, maxDate/*number|undefined*/) => {
    if (_.isNil(maxDate)) return false;
    return lastOnPage >= maxDate;
  }
};

const isPrevPageUnavailable = {
  byDisable: (firstOnPage/*number*/, disabledYears/*number[]|undefined*/) => {
    if (_.isNil(disabledYears)) return false;
    return _.every(_.range(firstOnPage - YEARS_ON_PAGE, firstOnPage), year => disabledYears.indexOf(year) >= 0);
  },
  byMinDate: (firstOnPage/*number*/, minDate/*number|undefined*/) => {
    if (_.isNil(minDate)) return false;
    return firstOnPage <= minDate;
  }
};

class YearPicker extends React.Component {
  /*
    Note:
      use it like this <YearPicker key={someInputValue} />
      to make react create new instance when input value changes
  */
  constructor(props) {
    super(props);
    this.state = {
      /* moment instance */
      date: props.initializeWith.clone(),
    };
  }

  buildYears() {
    const years = [];
    const first = this.state.date.year();
    for (let i = 0; i < YEARS_ON_PAGE; i++) {
      years[i] = (first + i).toString();
    }
    return years;
  }

  getActiveYear() {
    if (!_.isNil(this.props.value)) {
      const years = this.buildYears();
      const yearIndex = years.indexOf(this.props.value.year().toString());
      if (yearIndex >= 0) {
        return yearIndex;
      }
    }
  }

  getDisabledYears() {
    let disabled = [];
    const years = this.buildYears();
    if (_.isArray(this.props.disable)) {
      disabled = disabled.concat(
        this.props.disable
          .filter(yearMoment => _.includes(years, yearMoment.year().toString()))
          .map(yearMoment => years.indexOf(yearMoment.year().toString()))
      );
    }
    if (!_.isNil(this.props.maxDate)) {
      if (_.includes(years, this.props.maxDate.year().toString())) {
        disabled = disabled.concat(
          _.range(years.indexOf(this.props.maxDate.year().toString()) + 1, years.length)
        );
      }
    }
    if (!_.isNil(this.props.minDate)) {
      if (_.includes(years, this.props.minDate.year().toString())) {
        disabled = disabled.concat(
          _.range(0, years.indexOf(this.props.minDate.year().toString()))
        );
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
    const lastOnPage = parseInt(_.last(this.buildYears()));
    return !_.some([
      isNextPageUnavailable.byDisable(lastOnPage, _.map(disable, m => m.year())),
      isNextPageUnavailable.byMaxDate(lastOnPage, _.invoke(maxDate, 'year')),
    ]);
  }

  isPrevPageAvailable() {
    const {
      minDate,
      disable,
    } = this.props;
    const firstOnPage = parseInt(_.first(this.buildYears()));
    return !_.some([
      isPrevPageUnavailable.byDisable(firstOnPage, _.map(disable, m => m.year())),
      isPrevPageUnavailable.byMinDate(firstOnPage, _.invoke(minDate, 'year')),
    ]);
  }

  handleChange = (e, { value }) => {
    const year = parseInt(value);
    _.invoke(this.props, 'onChange', e, { ...this.props, value: { year } });
  }

  switchToNextPage = () => {
    this.setState(({ date }) => {
      const nextDate = date.clone();
      nextDate.add(YEARS_ON_PAGE, 'year');
      return { date: nextDate };
    });
  }

  switchToPrevPage = () => {
    this.setState(({ date }) => {
      const prevDate = date.clone();
      prevDate.subtract(YEARS_ON_PAGE, 'year');
      return { date: prevDate };
    });
  }

  render() {
    const rest = getUnhandledProps(YearPicker, this.props);
    return (
      <YearView
        { ...rest }
        years={this.buildYears()}
        onNextPageBtnClick={this.switchToNextPage}
        onPrevPageBtnClick={this.switchToPrevPage}
        onYearClick={this.handleChange}
        hasPrevPage={this.isPrevPageAvailable()}
        hasNextPage={this.isNextPageAvailable()}
        disabled={this.getDisabledYears()}
        active={this.getActiveYear()} />
    );
  }
}

YearPicker.propTypes = {
  /** Called after year is selected. */
  onChange: PropTypes.func.isRequired,
  /** A value for initializing year picker's state. */
  initializeWith: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected year. */
  value: PropTypes.instanceOf(moment),
  /** Array of disabled years. */
  disable: PropTypes.arrayOf(
    PropTypes.instanceOf(moment)
  ),
  /** Minimal year that could be selected. */
  minDate: PropTypes.instanceOf(moment),
  /** Maximal year that could be selected. */
  maxDate: PropTypes.instanceOf(moment),
};

export default YearPicker;
