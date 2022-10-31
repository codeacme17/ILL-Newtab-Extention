import React, { Component, createRef } from "react";
import Draggable from "react-draggable";

import Todo from "./Todo";
import Calendar from "./Calendar";
import Weather from "./Weather";
import "./index.scss";

export default class Sidebar extends Component {
  getLocalData = () => {
    this.localData = JSON.parse(localStorage.getItem("_setting_data"));
  };

  setLocalData = () => {
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  componentDidMount = () => {
    this.getLocalData();
    this.setState({ sortList: this.localData.sidebar.sortList });
  };

  // The sort list to render items in sider bar
  state = { sortList: [] };
  TodoRef = createRef();
  CalendarRef = createRef();
  WeatherRef = createRef();

  // Get each ref's offset top value & height to push in to the sort list,
  // when start drag item
  startDrag = (itemRef) => {
    // An array to store the different refs
    const refsList = [this.TodoRef, this.CalendarRef, this.WeatherRef];
    refsList.forEach((itemRef) => {
      this.state.sortList.forEach((item) => {
        if (itemRef.current._reactInternals.key === item.type) {
          item.offsetTop = this.getRefOffsetTopValue(itemRef);
          item.height = this.getRefHeightValue(itemRef);
        }
      });
    });
  };

  // Get each ref's height value
  getRefHeightValue = (itemRef) => {
    return itemRef.current._reactInternals.child.child.stateNode.clientHeight;
  };

  // Get each ref's offsetTop value
  getRefOffsetTopValue = (itemRef) => {
    return itemRef.current._reactInternals.child.child.stateNode.offsetTop;
  };

  // Get current ref's offsetTop Value,
  // while dragging the ref
  dragging = (itemRef) => {
    this.getCurrenRefOffsetTopValue(itemRef);
  };

  // Get current dragging ref's offsetTop value
  getCurrenRefOffsetTopValue = (itemRef) => {
    let pre = this.getRefOffsetTopValue(itemRef);
    let now = pre + itemRef.current.state.y - 16;
    this.currentRefOffsetTopValue = now;
  };

  // Diff the items and update sort list
  // When stop drag the item
  stopDrag = (index) => {
    this.getLocalData();
    this.diffItemsPosition(index);
    // Reset current ref offset top value
    this.currentRefOffsetTopValue = undefined;
    this.localData.sidebar.sortList = this.state.sortList;
    this.setLocalData();
  };

  // Diff the items position
  diffItemsPosition = (index) => {
    this.state.sortList.forEach((item, j) => {
      if (j === index) return;
      // Drag up
      if (this.currentRefOffsetTopValue - item.offsetTop - 10 < 0 && index > j) {
        this.transferItems(index, j);
      }
      // Drag down
      if (this.currentRefOffsetTopValue - item.offsetTop - item.height + 30 > 0 && index < j) {
        this.transferItems(index++, j);
      }
    });
  };

  // Switch both items in sort array
  transferItems = (i, j) => {
    let temp;
    let sortList = this.state.sortList;
    temp = sortList[i];
    sortList[i] = sortList[j];
    sortList[j] = temp;
    this.setState({ sortList });
  };

  render() {
    const { sortList } = this.state;

    return (
      <section className={`silder ${this.props.sidebarVisible ? "_show" : "_hide"}`}>
        {sortList.map((item, index) => {
          if (item.type === "todo")
            return (
              <Draggable
                key="todo"
                axis="y"
                handle=".drag-handle"
                cancel="button"
                ref={this.TodoRef}
                position={{ x: 0, y: 0 }}
                onStart={() => this.startDrag(this.TodoRef)}
                onStop={() => this.stopDrag(index)}
                onDrag={() => this.dragging(this.TodoRef)}
              >
                <div>
                  <Todo />
                </div>
              </Draggable>
            );

          if (item.type === "calendar")
            return (
              <Draggable
                key="calendar"
                axis="y"
                handle=".drag-handle"
                cancel="button"
                ref={this.CalendarRef}
                position={{ x: 0, y: 0 }}
                onStart={() => this.startDrag(this.CalendarRef)}
                onStop={() => this.stopDrag(index)}
                onDrag={() => this.dragging(this.CalendarRef)}
              >
                <div>
                  <Calendar />
                </div>
              </Draggable>
            );

          if (item.type === "weather")
            return (
              <Draggable
                key="weather"
                axis="y"
                handle=".drag-handle"
                cancel="button"
                ref={this.WeatherRef}
                position={{ x: 0, y: 0 }}
                onStart={() => this.startDrag(this.WeatherRef)}
                onStop={() => this.stopDrag(index)}
                onDrag={() => this.dragging(this.WeatherRef)}
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
