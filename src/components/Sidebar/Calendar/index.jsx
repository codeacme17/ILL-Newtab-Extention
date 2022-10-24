import React, { Component } from "react";
import ArrowupIcon from "../../../icons/arrowup";

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      nowDate: "10.24 Monday",
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
        <header>
          {nowDate}
          <button
            className={`border-[1px] border-main-400 dark:border-main-500 rounded-md
                        ${detailVisible ? "rotate-0" : "rotate-180"}`}
            onClick={this.switchDetailVisible}
          >
            <ArrowupIcon />
          </button>
        </header>

        <div
          className={`bg-main-100 dark:text-main-200 dark:bg-main-700 ease-in-out duration-300 transition-[height,padding]  
                      ${detailVisible ? "h-60 p-3" : "h-0 p-0"}`}
        >
          123123
        </div>
      </section>
    );
  }
}
