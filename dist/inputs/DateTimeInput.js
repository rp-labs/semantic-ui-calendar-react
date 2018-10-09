'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _InputView = require('../views/InputView');

var _InputView2 = _interopRequireDefault(_InputView);

var _YearPicker = require('../pickers/YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

var _MonthPicker = require('../pickers/MonthPicker');

var _MonthPicker2 = _interopRequireDefault(_MonthPicker);

var _DayPicker = require('../pickers/dayPicker/DayPicker');

var _DayPicker2 = _interopRequireDefault(_DayPicker);

var _HourPicker = require('../pickers/timePicker/HourPicker');

var _HourPicker2 = _interopRequireDefault(_HourPicker);

var _MinutePicker = require('../pickers/timePicker/MinutePicker');

var _MinutePicker2 = _interopRequireDefault(_MinutePicker);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

var _parse = require('./parse');

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var DateTimeInput = function (_BaseInput) {
  _inherits(DateTimeInput, _BaseInput);

  function DateTimeInput(props) {
    _classCallCheck(this, DateTimeInput);

    /*
      state fields:
        - mode: one of [ 'year', 'month', 'day', 'hour', 'minute' ]
        - year: number
        - month: number
        - date: number
        - hour: number
        - minute: number
    */
    var _this = _possibleConstructorReturn(this, (DateTimeInput.__proto__ || Object.getPrototypeOf(DateTimeInput)).call(this, props));

    _this._switchToNextModeUndelayed = function () {
      _this.setState(function (_ref) {
        var mode = _ref.mode;

        return { mode: getNextMode(mode) };
      });
    };

    _this.switchToNextMode = function () {
      (0, _lib.tick)(_this._switchToNextModeUndelayed);
    };

    _this._switchToPrevModeUndelayed = function () {
      _this.setState(function (_ref2) {
        var mode = _ref2.mode;

        return { mode: getPrevMode(mode) };
      });
    };

    _this.switchToPrevMode = function () {
      (0, _lib.tick)(_this._switchToPrevModeUndelayed);
    };

    _this.handleSelect = function (e, _ref3) {
      var value = _ref3.value;

      (0, _lib.tick)(_this._handleSelectUndelayed, e, { value: value });
    };

    _this._onFocus = function () {
      if (!_this.props.preserveViewMode) {
        _this.setState({ mode: _this.props.startMode });
      }
    };

    _this._handleSelectUndelayed = function (e, _ref4) {
      var value = _ref4.value;

      if (_this.props.closable && _this.state.mode === 'minute') {
        _this.closePopup();
      }
      _this.setState(function (prevState) {
        var mode = prevState.mode;

        var nextMode = mode;
        if (mode !== 'minute') {
          nextMode = getNextMode(mode);
        } else {
          var outValue = (0, _moment2.default)(value).format(_this.getDateTimeFormat());
          _lodash2.default.invoke(_this.props, 'onChange', e, _extends({}, _this.props, { value: outValue }));
        }
        return _extends({ mode: nextMode }, value);
      });
    };

    _this.state = {
      mode: props.startMode
    };
    var parsedValue = (0, _parse.parseValue)(props.value);
    if (parsedValue) {
      _this.state.year = parsedValue.year();
      _this.state.month = parsedValue.month();
      _this.state.date = parsedValue.date();
      _this.state.hour = parsedValue.hour();
      _this.state.minute = parsedValue.minute();
    }
    return _this;
  }

  _createClass(DateTimeInput, [{
    key: 'getDateParams',
    value: function getDateParams() {
      /* 
        Return date params that are used for picker initialization.
        Return undefined if none of [ 'year', 'month', 'date', 'hour', 'minute' ]
        state fields defined.
      */
      var _state = this.state,
          year = _state.year,
          month = _state.month,
          date = _state.date,
          hour = _state.hour,
          minute = _state.minute;

      if (!_lodash2.default.isNil(year) || !_lodash2.default.isNil(month) || !_lodash2.default.isNil(date) || !_lodash2.default.isNil(hour) || !_lodash2.default.isNil(minute)) {
        return { year: year, month: month, date: date, hour: hour, minute: minute };
      }
    }
  }, {
    key: 'getDateTimeFormat',
    value: function getDateTimeFormat() {
      var _props = this.props,
          dateFormat = _props.dateFormat,
          divider = _props.divider,
          timeFormat = _props.timeFormat;

      return '' + dateFormat + divider + _parse.TIME_FORMAT[timeFormat];
    }
  }, {
    key: 'getPicker',
    value: function getPicker() {
      var _props2 = this.props,
          value = _props2.value,
          initialDate = _props2.initialDate,
          dateFormat = _props2.dateFormat,
          disable = _props2.disable,
          minDate = _props2.minDate,
          maxDate = _props2.maxDate;

      var dateTimeFormat = this.getDateTimeFormat();
      var pickerProps = {
        displayWeeks: true,
        hasHeader: true,
        onChange: this.handleSelect,
        onHeaderClick: this.switchToPrevMode,
        initializeWith: (0, _parse.getInitializer)({ initialDate: initialDate, dateFormat: dateTimeFormat, dateParams: this.getDateParams() }),
        value: (0, _parse.parseValue)((0, _parse.chooseValue)(value, initialDate), dateTimeFormat),
        disable: (0, _parse.parseArrayOrValue)(disable),
        minDate: (0, _parse.parseValue)(minDate, dateFormat),
        maxDate: (0, _parse.parseValue)(maxDate, dateFormat)
        // key: value, // seems like it works without reinstantiating picker every time value changes
      };
      var mode = this.state.mode;

      if (mode === 'year') {
        return _react2.default.createElement(_YearPicker2.default, pickerProps);
      }
      if (mode === 'month') {
        return _react2.default.createElement(_MonthPicker2.default, pickerProps);
      }
      if (mode === 'day') {
        return _react2.default.createElement(_DayPicker2.default, pickerProps);
      }
      if (mode === 'hour') {
        return _react2.default.createElement(_HourPicker2.default, _extends({ timeFormat: this.props.timeFormat }, pickerProps));
      }
      return _react2.default.createElement(_MinutePicker2.default, _extends({ timeFormat: this.props.timeFormat }, pickerProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          value = _props3.value,
          initialDate = _props3.initialDate;

      var rest = (0, _lib.getUnhandledProps)(DateTimeInput, this.props);
      return _react2.default.createElement(
        _InputView2.default,
        _extends({
          popupIsClosed: this.state.popupIsClosed,
          onPopupUnmount: this.onPopupClose,
          icon: 'calendar',
          onFocus: this._onFocus
        }, rest, {
          value: (0, _parse.chooseValue)(value, (0, _parse.initialDateToString)(initialDate, this.getDateTimeFormat())) }),
        this.getPicker()
      );
    }
  }]);

  return DateTimeInput;
}(_BaseInput3.default);

DateTimeInput.handledProps = ['closable', 'dateFormat', 'disable', 'divider', 'initialDate', 'maxDate', 'minDate', 'preserveViewMode', 'startMode', 'timeFormat', 'value'];


DateTimeInput.propTypes = {
  /** Currently selected value. */
  value: _propTypes2.default.string,
  /** Moment date formatting string. */
  dateFormat: _propTypes2.default.string,
  /** Time format ["AMPM", "ampm", "24"] */
  timeFormat: _propTypes2.default.string,
  /** Date to display initially when no date is selected. */
  initialDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Date or list of dates that are displayed as disabled. */
  disable: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)), _propTypes2.default.instanceOf(Date), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]),
  /** Maximum date that can be selected. */
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Minimum date that can be selected. */
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Preserve viewmode on focus? */
  preserveViewMode: _propTypes2.default.bool,
  /** Display mode to start. */
  startMode: _propTypes2.default.oneOf(['year', 'month', 'day']),
  /** Date and time divider. */
  divider: _propTypes2.default.string,
  /** If true, popup closes after selecting a date-time. */
  closable: _propTypes2.default.bool
};

DateTimeInput.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  timeFormat: '24',
  startMode: 'day',
  divider: ' ',
  preserveViewMode: true
};

exports.default = DateTimeInput;