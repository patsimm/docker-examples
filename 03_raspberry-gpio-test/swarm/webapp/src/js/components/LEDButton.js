import React from "react";

export default class LEDButton extends React.Component {
  buttonClicked(e) {
    this.props.update();
  }

  render() {
    return (
      <div>
        <button
          onClick={this.buttonClicked.bind(this)}
          class="btn btn-default"
          disabled={!this.props.active}>
            {this.props.title}
        </button>
      </div>
    );
  }
}
