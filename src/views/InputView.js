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
  } = props;
  const rest = getUnhandledProps(InputView, props);
  
  const inputElement = (
    <Form.Input
      { ...rest }
      value={value}
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
  inline: PropTypes.bool,
  popupPosition: PropTypes.string,
  value: PropTypes.string,
  closeOnMouseLeave: PropTypes.bool,
  onChange: PropTypes.bool,
  children: PropTypes.node,
};

export default InputView;
