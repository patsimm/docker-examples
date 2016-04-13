import React from "react";

import LEDButton from "./LEDButton";
import State from "./State";

var http = require('http');

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      state: "Loading...",
      buttonTitle: "Loading...",
      buttonActive: false
    };
  }
  componentDidMount() {
    this.startPolling();
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  startPolling() {
    setTimeout(() => {
      this.poll(); // do it once and then start it up ...
      this._timer = setInterval(this.poll.bind(this), 3000);
    }, 1000);
  }

  poll() {
    this.sendHttpAndUpdate("/led/state")
  }

  sendHttpAndUpdate(requestUrl) {
    http.get(requestUrl, (res) => {
      res.on('data', (chunk) => {
        var json = JSON.parse(chunk);
        var state = {
          state: json.state,
          buttonTitle: "",
          buttonActive: true
        };

        if(json.state === "OFF") {
          state.buttonTitle = "Switch On";
        } else if (json.state === "ON") {
          state.buttonTitle = "Switch Off";
        } else {
          state.buttonTitle = "Error"
          state.buttonActive = false;
        }

        this.setState(state);
      })
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    });
  }

  buttonClicked() {
    if(this.state.state === "ON") {
      this.sendHttpAndUpdate("/led/off");
    } else if (this.state.state == "OFF") {
      this.sendHttpAndUpdate("/led/on");
    }
  }

  render() {
    return (
      <div class="text-center">
        <h1>LED Button</h1>
        <LEDButton
          update={this.buttonClicked.bind(this)}
          title={this.state.buttonTitle}
          active={this.state.buttonActive}
        />
        <State state={this.state.state}/>
      </div>
    );
  }
}
