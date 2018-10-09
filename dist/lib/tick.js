"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Set zero timeout.
 * 
 * Sometimes we need to delay rerendering components
 * on one tick (if they are inside  `Popup` and rerendering could
 * change `Popup`'s content sizes).
 * Becouse it races with Popup's onclick handler.
 * `Popup` relies on it's content sizes when computing
 * should popup stay open or be closed. So we need
 * to wait until `Popup`'s onclick handler done its job.
 */
var tick = function tick(leadToRerendering) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  setTimeout.apply(undefined, [leadToRerendering, 0].concat(args));
};

exports.default = tick;