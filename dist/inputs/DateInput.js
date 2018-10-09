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
  return 'year';
}

function getPrevMode(currentMode) {
  if (currentMode === 'day') return 'month';
  if (currentMode === 'month') return 'year';
  return 'day';
}

var DateInput = function (_BaseInput) {
  _inherits(DateInput, _BaseInput);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    /*
      state fields:
        - mode: one of [ 'year', 'month', 'day' ]
        - year: number
        - month: number
        - date: number
    */
    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

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

    _this._onFocus = function () {
      if (!_this.props.preserveViewMode) {
        _this.setState({ mode: _this.props.startMode });
      }
    };

    _this.handleSelect = function (e, _ref3) {
      var value = _ref3.value;

      if (_this.state.mode === 'day' && _this.props.closable) {
        _this.closePopup();
      }
      _this.setState(function (prevState) {
        var mode = prevState.mode;

        var nextMode = mode;
        if (mode !== 'day') {
          nextMode = getNextMode(mode);
        } else {
          var outValue = (0, _moment2.default)(value).format(_this.props.dateFormat);
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
    }
    return _this;
  }

  _createClass(DateInput, [{
    key: 'getDateParams',
    value: function getDateParams() {
      /* 
        Return date params that are used for picker initialization.
        Return undefined if none of [ 'year', 'month', 'date' ]
        state fields defined.
      */
      var _state = this.state,
          year = _state.year,
          month = _state.month,
          date = _state.date;

      if (!_lodash2.default.isNil(year) || !_lodash2.default.isNil(month) || !_lodash2.default.isNil(date)) {
        return { year: year, month: month, date: date };
      }
    }
  }, {
    key: 'getPicker',
    value: function getPicker() {
      var _props = this.props,
          value = _props.value,
          initialDate = _props.initialDate,
          dateFormat = _props.dateFormat,
          disable = _props.disable,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          enable = _props.enable;

      var pickerProps = {
        hasHeader: true,
        onChange: this.handleSelect,
        onHeaderClick: this.switchToPrevMode,
        initializeWith: (0, _parse.getInitializer)({ initialDate: initialDate, dateFormat: dateFormat, dateParams: this.getDateParams() }),
        value: (0, _parse.parseValue)((0, _parse.chooseValue)(value, initialDate), dateFormat),
        disable: (0, _parse.parseArrayOrValue)(disable, dateFormat),
        enable: (0, _parse.parseArrayOrValue)(enable, dateFormat),
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
      return _react2.default.createElement(_DayPicker2.default, pickerProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          value = _props2.value,
          dateFormat = _props2.dateFormat,
          initialDate = _props2.initialDate;

      var rest = (0, _lib.getUnhandledProps)(DateInput, this.props);
      return _react2.default.createElement(
        _InputView2.default,
        _extends({
          popupIsClosed: this.state.popupIsClosed,
          onPopupUnmount: this.onPopupClose,
          icon: 'calendar',
          onFocus: this._onFocus
        }, rest, {
          value: (0, _parse.chooseValue)(value, (0, _parse.initialDateToString)(initialDate, dateFormat)) }),
        this.getPicker()
      );
    }
  }]);

  return DateInput;
}(_BaseInput3.default);

DateInput.handledProps = ['closable', 'dateFormat', 'disable', 'enable', 'initialDate', 'maxDate', 'minDate', 'preserveViewMode', 'startMode', 'value'];


DateInput.propTypes = {
  /** Currently selected value. */
  value: _propTypes2.default.string,
  /** Moment date formatting string. */
  dateFormat: _propTypes2.default.string,
  /** Date to display initially when no date is selected. */
  initialDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Date or list of dates that are displayed as disabled. */
  disable: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)), _propTypes2.default.instanceOf(Date), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]),
  /** Date or list of dates that are enabled (the rest are disabled). */
  enable: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]),
  /** Maximum date that can be selected. */
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Minimum date that can be selected. */
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default), _propTypes2.default.instanceOf(Date)]),
  /** Preserve viewmode on focus? */
  preserveViewMode: _propTypes2.default.bool,
  /** Display mode to start. */
  startMode: _propTypes2.default.oneOf(['year', 'month', 'day']),
  /** If true, popup closes after selecting a date-time. */
  closable: _propTypes2.default.bool
};

DateInput.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  startMode: 'day',
  preserveViewMode: true
};

exports.default = DateInput;