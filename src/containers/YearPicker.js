import React from 'react';
import { YearPickerComponent, PickerHeader } from '../components';
import { Table } from 'semantic-ui-react';
import { getUnhandledProps, emptyFunction } from '../utils.js';
import PropTypes from 'prop-types';
import moment from 'moment';

class YearPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeYear: '',
      yearsStart: moment().year() - 6
    };
  }

  onYearClick = (event, data) => {
    this.setState({ activeYear: data.value });
    this.props.onYearChange(event, data);
  }

  getActiveYear = () => {
    return this.state.activeYear || moment().year();
  }

  onNextBtnClick = () => {
    this.setState(({ yearsStart }) => {
      return { yearsStart: yearsStart + 12 };
    });
  }

  onPrevBtnClick = () => {
    this.setState(({ yearsStart }) => {
      return { yearsStart: yearsStart - 12 };
    });
  }

  getContent = () => {
    const { yearsStart } = this.state;
    const yearsRange = {
      start: yearsStart,
      end: yearsStart + 11
    };
    return (
      <React.Fragment>
        <PickerHeader
          onDateClick={this.props.onHeaderDateClick}
          width="3"
          activeYears={yearsRange}
          onPrevBtnClick={this.onPrevBtnClick}
          onNextBtnClick={this.onNextBtnClick} />
        <YearPickerComponent
          onYearClick={this.onYearClick}
          activeYear={this.getActiveYear()}
          yearsStart={yearsStart} />
      </React.Fragment>
    );
  }

  render() {
    const rest = getUnhandledProps(YearPicker, this.props);

    if (this.props.standalone) {
      return (
        <Table
          { ...rest }
          unstackable
          celled
          textAlign="center">
          { this.getContent() }
        </Table>
      );
    }
    return this.getContent();
  }
}

YearPicker.propTypes = {
  /** (event, data) => {} */
  onYearChange: PropTypes.func,
  standalone: PropTypes.bool,
  onHeaderDateClick: PropTypes.func
};

YearPicker.defaultProps = {
  onYearChange: emptyFunction,
  standalone: true
};

export default YearPicker;
export {
  YearPicker
};