import React, { Component } from "react";
import Calendar from "./Calendar";

export default class Sidebar extends Component {
  render() {
    return (
      <section className="h-full pointer-events-none w-[350px] pr-3 fixed right-0 top-0 flex flex-col-reverse">
        <Calendar />
      </section>
    );
  }
}
