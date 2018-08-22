import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Form } from 'semantic-ui-react';

import { getUnhandledProps } from '../lib';

const popupStyle = {
  padding: '0',
};

function InputView(props) {
  const {
    popupPosition,
    inline,
    value,
    closeOnMouseLeave,
    onChange,
    inlineLabel,
  } = props;
  const rest = getUnhandledProps(InputView, props);
  
  const inputElement = (
    <Form.Input
      { ...rest }
      value={value}
      inline={inlineLabel}
      onChange={onChange} />
  );

  if (inline) return props.children;
  return (
    <Popup
      position={popupPosition}
      trigger={inputElement}
      hoverable={closeOnMouseLeave}
      flowing
      style={popupStyle}
      hideOnScroll
      on="click">
      { props.children }
    </Popup>
  );
}

InputView.propTypes = {
  /** Whether to display inline picker or picker inside a popup. */
  inline: PropTypes.bool,
  /** Where to display popup. */
  popupPosition: PropTypes.string,
  /** Currently selected value. */
  value: PropTypes.string,
  /** Wheter to close a popup when cursor leaves it. */
  closeOnMouseLeave: PropTypes.bool,
  /** Called after input field value has changed. */
  onChange: PropTypes.func,
  /** Picker. */
  children: PropTypes.node,
  /** A field can have its label next to instead of above it. */
  inlineLabel: PropTypes.bool,
};

InputView.defaultProps = {
  inline: false,
  closeOnMouseLeave: true
};

export default InputView;
