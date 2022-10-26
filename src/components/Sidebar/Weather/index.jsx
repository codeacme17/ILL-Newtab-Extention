import React, { Component } from "react";
import ArrowupIcon from "../../../icons/arrowup";

export default class Weather extends Component {
  state = {
    detailVisible: false,
  };

  // Switch detail content visible handler
  switchDetailVisible = () => {
    if (this.state.detailVisible) this.setState({ detailVisible: false });
    else this.setState({ detailVisible: true });
  };

  render() {
    const { detailVisible } = this.state;

    return (
      <section className="silder-item">
        <div className="header drag-handle">
          Weather
          <button
            className={`draw-btn ${detailVisible ? "rotate-0" : "rotate-180"}`}
            onClick={this.switchDetailVisible}
          >
            <ArrowupIcon />
          </button>
        </div>

        <div className={`content ${detailVisible ? "h-60 p-3" : "h-0 p-0"}`}>
          <div></div>
        </div>
      </section>
    );
  }
}
