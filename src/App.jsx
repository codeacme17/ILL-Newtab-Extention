import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Topbar />
        <Searchbar />
        <Sidebar />
      </div>
    );
  }
}
