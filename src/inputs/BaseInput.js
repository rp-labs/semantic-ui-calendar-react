import React from 'react';
import ReactDOM from 'react-dom';

class BaseInput extends React.Component {
  componentDidMount() {
    this.inputNode = ReactDOM.findDOMNode(this).querySelector('input');
  }

  closePopup() {
    this.inputNode && this.inputNode.click();
  }
}

export default BaseInput;
