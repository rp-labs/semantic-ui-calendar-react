'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Header = require('./CalendarHeader/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./CalendarBody/Body');

var _Body2 = _interopRequireDefault(_Body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONTH_CALENDAR_ROW_WIDTH = '3';

function MonthView(props) {
  var months = props.months,
      hasHeader = props.hasHeader,
      onMonthClick = props.onMonthClick,
      onNextPageBtnClick = props.onNextPageBtnClick,
      onPrevPageBtnClick = props.onPrevPageBtnClick,
      hasPrevPage = props.hasPrevPage,
      hasNextPage = props.hasNextPage,
      onHeaderClick = props.onHeaderClick,
      disabled = props.disabled,
      active = props.active,
      currentYear = props.currentYear;

  var headerProps = {
    onNextPageBtnClick: onNextPageBtnClick,
    onPrevPageBtnClick: onPrevPageBtnClick,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
    onHeaderClick: onHeaderClick,
    title: currentYear,
    displayWeeks: false,
    width: MONTH_CALENDAR_ROW_WIDTH
  };
  return _react2.default.createElement(
    _Calendar2.default,
    null,
    hasHeader && _react2.default.createElement(_Header2.default, headerProps),
    _react2.default.createElement(_Body2.default, {
      width: MONTH_CALENDAR_ROW_WIDTH,
      data: months,
      onCellClick: onMonthClick,
      active: active,
      disabled: disabled })
  );
}

MonthView.handledProps = ['active', 'currentYear', 'disabled', 'hasHeader', 'hasNextPage', 'hasPrevPage', 'months', 'onHeaderClick', 'onMonthClick', 'onNextPageBtnClick', 'onPrevPageBtnClick'];
MonthView.propTypes = {
  /** Array of months to fill a calendar with. */
  months: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  /** Wether to display header or not. */
  hasHeader: _propTypes2.default.bool.isRequired,
  /** Called after click on month. */
  onMonthClick: _propTypes2.default.func.isRequired,
  /** Called after click on next page button. */
  onNextPageBtnClick: _propTypes2.default.func,
  /** Called after click on previous page button. */
  onPrevPageBtnClick: _propTypes2.default.func,
  /** Whether to display previous page button as active or disabled. */
  hasPrevPage: _propTypes2.default.bool,
  /** Whether to display next page button as active or disabled. */
  hasNextPage: _propTypes2.default.bool,
  /** Called after click on calendar header. */
  onHeaderClick: _propTypes2.default.func,
  /** An array of month indexes to display as disabled. */
  disabled: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** Index of a month that should be displayed as active. */
  active: _propTypes2.default.number,
  /** A year to display in header. */
  currentYear: _propTypes2.default.string
};

exports.default = MonthView;