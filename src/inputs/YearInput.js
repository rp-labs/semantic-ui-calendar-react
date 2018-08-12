import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import InputView from '../views/InputView';
import YearPicker from '../pickers/YearPicker';
import {
  parseValue,
  parseDirty,
  getInitializer,
} from './parse';

class YearInput extends React.Component {
  parseString(value) {
    if (_.isString(value)) {
      return parseValue(value, this.props.dateFormat);
    }
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
    return (
      <InputView
        value={value}>
        <YearPicker
          onChange={this.handleSelect}
          initializeWith={getInitializer(value, initialDate, dateFormat)}
          value={this.parseString(value)}
          disable={parseDirty(disable, dateFormat)}
          maxDate={parseDirty(maxDate, dateFormat)}
          minDate={parseDirty(minDate, dateFormat)} />
      </InputView>
    );
  }
}

YearInput.propTypes = {
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  initialDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
  ]),
  disable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.instanceOf(moment),
    PropTypes.arrayOf(PropTypes.instanceOf(moment)),
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
  ]),
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
