import React, { Component } from "react";
import Draggable from "react-draggable";

import Todo from "./Todo";
import Calendar from "./Calendar";
import Weather from "./Weather";
import "./index.scss";

export default class Sidebar extends Component {
  render() {
    return (
      <section className={`silder ${this.props.sidebarVisible ? "_show" : "_hide"}`}>
        <Draggable
          axis="y"
          handle=".drag-handle"
          bounds="parent"
          cancel="button"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[10, 1]}
        >
          <div>
            <Todo />
          </div>
        </Draggable>

        <Draggable
          axis="y"
          handle=".drag-handle"
          bounds="parent"
          cancel="button"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[10, 1]}
        >
          <div>
            <Calendar />
          </div>
        </Draggable>

        <Draggable
          axis="y"
          handle=".drag-handle"
          bounds="parent"
          cancel="button"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[10, 1]}
        >
          <div>
            <Weather />
          </div>
        </Draggable>
      </section>
    );
  }
}
