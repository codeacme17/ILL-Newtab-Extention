import React, { Component, createRef } from "react";
import Draggable from "react-draggable";

import Todo from "./Todo";
import Calendar from "./Calendar";
import Weather from "./Weather";
import "./index.scss";

export default class Sidebar extends Component {
  TodoRef = createRef();
  CalendarRef = createRef();
  WeatherRef = createRef();

  state = {
    currentEl: HTMLElement,
    sortList: ["calendar", "weather", "todo"],
  };

  startDrag = (itemRef, index) => {
    this.setState({ currentEl: itemRef.current._reactInternals.child.stateNode });
  };

  stopDrag = () => {
    this.setState({ sortList: ["calendar", "todo", "weather"] });
    console.log(this.getComputedTranslateY(this.state.currentEl));
  };

  dragging = () => {};

  getComputedTranslateY = (obj) => {
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
      transform = style.transform;
    console.log(transform);
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(", ")[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(", ")[5]) : 0;
  };

  render() {
    const { sortList } = this.state;

    return (
      <section className={`silder ${this.props.sidebarVisible ? "_show" : "_hide"}`}>
        {sortList.map((item, index) => {
          if (item === "todo")
            return (
              <Draggable
                key="todo"
                axis="y"
                handle=".drag-handle"
                bounds="parent"
                cancel="button"
                defaultPosition={{ x: 0, y: 0 }}
                grid={[10, 1]}
                onStart={() => this.startDrag(this.TodoRef, index)}
                onStop={this.stopDrag}
                onDrag={this.dragging}
              >
                <div>
                  <Todo ref={this.TodoRef} />
                </div>
              </Draggable>
            );
          if (item === "calendar")
            return (
              <Draggable
                key="calendar"
                axis="y"
                handle=".drag-handle"
                bounds="parent"
                cancel="button"
                defaultPosition={{ x: 0, y: 0 }}
                grid={[10, 1]}
                ref={this.CalendarRef}
              >
                <div>
                  <Calendar />
                </div>
              </Draggable>
            );
          if (item === "weather")
            return (
              <Draggable
                key="weather"
                axis="y"
                handle=".drag-handle"
                bounds="parent"
                cancel="button"
                defaultPosition={{ x: 0, y: 0 }}
                grid={[10, 1]}
                ref={this.WeatherRef}
              >
                <div>
                  <Weather />
                </div>
              </Draggable>
            );

          return "";
        })}
      </section>
    );
  }
}
