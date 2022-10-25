import React, { Component } from "react";
import ArrowupIcon from "../../../icons/arrowup";

export default class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      nowDate: "Oct 24,2022 Monday",
      detailVisible: false,
    };
  }

  // Switch detail content visible handler
  switchDetailVisible = () => {
    if (this.state.detailVisible) this.setState({ detailVisible: false });
    else this.setState({ detailVisible: true });
  };

  render() {
    const { nowDate, detailVisible } = this.state;

    return (
      <section className="silder-item">
        <div className="header drag-handle">
          {nowDate}
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
