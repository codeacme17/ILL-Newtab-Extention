import React, { Component } from "react";
import Home from "./components/Home";
import Topbar from "./components/Topbar";

export default class App extends Component {
  render() {
    return (
      <div className="App bg-dark-100 h-[100vh] dark:bg-zinc-900">
        <Topbar />
        <Home />
      </div>
    );
  }
}
