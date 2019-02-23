import React, { Component } from 'react';

export default class Incrementer extends Component {
  state = { number = 0 };

  increment = () => {
    this.setState({ number: this.state.number + 1 });
  }

  render() {
    const { number } = this.state;

    return (
      Num: {number} <br />

      <button onClick={this.increment}>
        Add
      </button>
    );
  }
}
