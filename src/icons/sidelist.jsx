import React, { Component } from "react";

export default class SideListIcon extends Component {
  render() {
    const { sidebarVisible } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-search dark:stroke-main-400"
      >
        <line x1="21" y1="6" x2="3" y2="6"></line>
        <line
          x1={sidebarVisible ? "16" : "21"}
          y1="10"
          x2={sidebarVisible ? "3" : "7"}
          y2="10"
          className="ease-in-out duration-200"
        ></line>
        <line x1="21" y1="14" x2="3" y2="14"></line>
        <line
          x1={sidebarVisible ? "18" : "21"}
          y1="18"
          x2={sidebarVisible ? "3" : "7"}
          y2="18"
          className="ease-in-out duration-200"
        ></line>
      </svg>
    );
  }
}
