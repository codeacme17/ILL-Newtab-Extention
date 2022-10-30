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

  state = {
    // The sort list to render items in sider bar
    sortList: [],
  };

  // An array to store the different refs
  refsList = [this.TodoRef, this.CalendarRef, this.WeatherRef];

  // Get each ref's offset top value & height to push in to the sort list,
  // when start drag item
  startDrag = (itemRef) => {
    this.refsList.forEach((itemRef) => {
      this.state.sortList.forEach((item) => {
        if (itemRef.current._reactInternals.key === item.type) {
          item.offsetTop = this.getRefOffsetTopValue(itemRef);
          item.height = this.getRefHeight(itemRef);
        }
      });
    });
  };

  // Get current dragging ref's offsetValue,
  // while dragging the ref
  dragging = (itemRef, index) => {
    this.getCurrenRefOffsetTopValue(itemRef);
  };

  // Diff the item and update
  stopDrag = (itemRef, index) => {
    this.getLocalData();
    itemRef.current.state.y = 0;
    this.state.sortList.forEach((item, j) => {
      if (j === index) return;
      if (this.currentRefOffsetTopValue - item.offsetTop - 30 < 0 && index > j) {
        this.transferSortListItem(index, j);
      }
      if (this.currentRefOffsetTopValue - item.offsetTop - item.height + 30 > 0 && index < j) {
        this.transferSortListItem(index++, j);
      }
    });
    // Reset current ref offset top value
    this.currentRefOffsetTopValue = undefined;
    this.localData.sidebar.sortList = this.state.sortList;
    this.setLocalData();
  };

  getRefHeight = (itemRef) => {
    return itemRef.current._reactInternals.child.child.stateNode.clientHeight;
  };

  // Get each ref's offsetTop value
  getRefOffsetTopValue = (itemRef) => {
    return itemRef.current._reactInternals.child.child.stateNode.offsetTop;
  };

  // Get current ref's offsetTop value
  getCurrenRefOffsetTopValue = (itemRef) => {
    let pre = this.getRefOffsetTopValue(itemRef);
    let now = pre + itemRef.current.state.y - 16;
    this.currentRefOffsetTopValue = now;
  };

  // Switch both items in sort array
  transferSortListItem = (i, j) => {
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
                bounds="parent"
                cancel="button"
                onStart={() => this.startDrag(this.TodoRef, index)}
                onStop={() => this.stopDrag(this.TodoRef, index)}
                onDrag={() => this.dragging(this.TodoRef, index)}
                ref={this.TodoRef}
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
                bounds="parent"
                cancel="button"
                onStart={() => this.startDrag(this.CalendarRef, index)}
                onStop={() => this.stopDrag(this.CalendarRef, index)}
                onDrag={() => this.dragging(this.CalendarRef, index)}
                ref={this.CalendarRef}
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
                bounds="parent"
                cancel="button"
                onStart={() => this.startDrag(this.WeatherRef, index)}
                onStop={() => this.stopDrag(this.WeatherRef, index)}
                onDrag={() => this.dragging(this.WeatherRef, index)}
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
