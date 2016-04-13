import React from "react";

export default class State extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        State: {this.props.state}
      </div>
    );
  }
}
