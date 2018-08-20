import React from 'react';

class InputMixin extends React.Component {

  componentDidUpdate(prevProps) {
    this.value = undefined;
    if (prevProps.value !== this.props.value) {
      this.value = this.props.value;
    }
  }

  getInputValue() {
    // only if previous this.props.value is not the same as current this.props.value
    // this.value is not undefined
    return this.value;
  }
}

export default InputMixin;
