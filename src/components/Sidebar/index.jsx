import React, { Component } from "react";
import Todo from "./Todo";
import Calendar from "./Calendar";

export default class Sidebar extends Component {
  render() {
    return (
      <section className="silder w-[370px] pr-3 pl-2 mt-16 fixed right-0 top-0 flex flex-col-reverse overflow-y-scroll overflow-x-auto">
        <Calendar />
        <Todo />
      </section>
    );
  }
}
