import React, { Component } from "react";

export default class LoadingIcon extends Component {
  render() {
    return (
      <span className="relative inline-flex rounded-full h-5 w-5 bg-main-500">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-400 opacity-75"></span>
      </span>
    );
  }
}
