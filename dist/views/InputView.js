'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var popupStyle = {
  padding: '0'
};

function InputView(props) {
  var popupPosition = props.popupPosition,
      inline = props.inline,
      value = props.value,
      closeOnMouseLeave = props.closeOnMouseLeave,
      onChange = props.onChange,
      inlineLabel = props.inlineLabel,
      popupIsClosed = props.popupIsClosed,
      onPopupUnmount = props.onPopupUnmount,
      mountNode = props.mountNode;

  var rest = (0, _lib.getUnhandledProps)(InputView, props);

  var inputElement = _react2.default.createElement(_semanticUiReact.Form.Input, _extends({}, rest, {
    value: value,
    inline: inlineLabel,
    onChange: onChange }));

  if (inline) return props.children;
  return _react2.default.createElement(
    _semanticUiReact.Popup,
    {
      position: popupPosition,
      open: popupIsClosed ? false : undefined,
      trigger: inputElement,
      hoverable: closeOnMouseLeave,
      flowing: true,
      mountNode: mountNode,
      onUnmount: onPopupUnmount,
      style: popupStyle,
      hideOnScroll: true,
      on: 'click'
    },
    props.children
  );
}

InputView.handledProps = ['children', 'closeOnMouseLeave', 'inline', 'inlineLabel', 'mountNode', 'onChange', 'onPopupUnmount', 'popupIsClosed', 'popupPosition', 'value'];
InputView.propTypes = {
  /** Whether to display inline picker or picker inside a popup. */
  inline: _propTypes2.default.bool,
  /** Where to display popup. */
  popupPosition: _propTypes2.default.string,
  /** Currently selected value. */
  value: _propTypes2.default.string,
  /** Whether to close a popup when cursor leaves it. */
  closeOnMouseLeave: _propTypes2.default.bool,
  /** Called after input field value has changed. */
  onChange: _propTypes2.default.func,
  /** Picker. */
  children: _propTypes2.default.node,
  /** A field can have its label next to instead of above it. */
  inlineLabel: _propTypes2.default.bool,
  /** Whether popup is closed. */
  popupIsClosed: _propTypes2.default.bool,
  /** Called when popup is forsed to close. */
  onPopupUnmount: _propTypes2.default.func,
  /** The node where the picker should mount. */
  mountNode: _propTypes2.default.any
};

InputView.defaultProps = {
  inline: false,
  closeOnMouseLeave: true
};

exports.default = InputView;