import React, { Component } from "react";
import Todo from "./Todo";
import Calendar from "./Calendar";
import Draggable from "react-draggable";
import "./index.scss";

export default class Sidebar extends Component {
  render() {
    return (
      <section className="silder">
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
            <Todo />
          </div>
        </Draggable>
      </section>
    );
  }
}
