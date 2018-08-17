import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import HourView from '../../views/HourView';
import { getUnhandledProps } from '../../lib';
import { buildTimeStringWithSuffix } from './sharedFunctions';

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

  buildHours() {
    return _.range(0, 24).map((h) => {
      return `${h < 10? '0' : ''}${h}`;
    }).map(hour => buildTimeStringWithSuffix(hour, '00', this.props.timeFormat));
  }

  getActiveHour() {
    if (this.props.value) {
      return this.props.value.hour();
    }
  }

  isNextPageAvailable() {
    const { maxDate } = this.props;
    if (maxDate) {
      return maxDate.isAfter(this.state.date, 'day');
    }
    return true;
  }

  isPrevPageAvailable() {
    const { minDate } = this.props;
    if (minDate) {
      return minDate.isBefore(this.state.date, 'day');
    }
    return true;
  }

  getDisabledHours() {
    const {
      disable,
      minDate,
      maxDate,
    } = this.props;
    let disabledByDisable = [];
    let disabledByMaxDate = [];
    let disabledByMinDate = [];

    if (_.isArray(disable)) {
      disabledByDisable = _.concat(
        disabledByDisable,
        disable.filter(date => date.isSame(this.state.date, 'day'))
          .map(date => date.hour())
      );
    }
    if (minDate) {
      if (minDate.isSame(this.state.date, 'day')) {
        disabledByMinDate = _.concat(
          disabledByMinDate,
          _.range(0 , minDate.hour())
        );
      }
    }
    if (maxDate) {
      if (maxDate.isSame(this.state.date, 'day')) {
        disabledByMaxDate = _.concat(
          disabledByMaxDate,
          _.range(maxDate.hour() + 1, 24)
        );
      }
    }
    const result = _.sortBy(
      _.uniq(
        _.concat(disabledByDisable, disabledByMaxDate, disabledByMinDate)));
    if (result.length > 0) {
      return result;
    }
  }

  getCurrentDate() {
    return this.state.date.format('MMMM DD, YYYY');
  }

  handleChange = (e, { value }) => {
    const data = {
      year: this.state.date.year(),
      month: this.state.date.month(),
      date: this.state.date.date(),
      hour: this.buildHours().indexOf(value),
    };
    _.invoke(this.props, 'onChange', e, { ...this.props, value: data });
  }

  switchToNextPage = () => {
    this.setState(({ date }) => {
      const nextDate = date.clone();
      nextDate.add(1, 'day');
      return { date: nextDate };
    });
  }

  switchToPrevPage = () => {
    this.setState(({ date }) => {
      const prevDate = date.clone();
      prevDate.subtract(1, 'day');
      return { date: prevDate };
    });
  }

  render() {
    const rest = getUnhandledProps(HourPicker, this.props);
    return (
      <HourView
        { ...rest }
        hours={this.buildHours()}
        onNextPageBtnClick={this.switchToNextPage}
        onPrevPageBtnClick={this.switchToPrevPage}
        hasPrevPage={this.isPrevPageAvailable()}
        hasNextPage={this.isNextPageAvailable()}
        onHourClick={this.handleChange}
        disabled={this.getDisabledHours()}
        active={this.getActiveHour()}
        currentDate={this.getCurrentDate()} />
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
  /** Time format. */
  timeFormat: PropTypes.oneOf([
    'ampm', 'AMPM', '24',
  ]),
};

HourPicker.defaultProps = {
  timeFormat: '24',
};

export default HourPicker;
