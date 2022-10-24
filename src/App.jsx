import React, { Component } from "react";
import Home from "./components/Home";
import Topbar from "./components/Topbar";

export default class App extends Component {
  componentDidMount = () => {
    document.documentElement.classList.add("dark");
  };

  render() {
    return (
      <div className="App bg-dark-100 h-[100vh] dark:bg-zinc-900">
        <Topbar />
        <Home />
      </div>
    );
  }
}
