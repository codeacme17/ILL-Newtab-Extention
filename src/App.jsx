import React, { Component } from "react";

import Searchbar from "./components/Searchbar";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

export default class App extends Component {
  getLocalData = () => {
    this.localData = JSON.parse(localStorage.getItem("_setting_data"));
  };

  setLocalData = () => {
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  constructor() {
    super();
    // Init local storage data
    this.getLocalData();
    if (!this.localData) {
      this.localData = {
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
        searchEngine: "bing",
        sidebar: {
          open: false,
          sortList: [
            { type: "calendar", offsetTop: 0, height: 0 },
            { type: "weather", offsetTop: 0, height: 0 },
            { type: "todo", offsetTop: 0, height: 0 },
          ],
        },
        weather: { open: true },
        todo: { open: true, list: [] },
        calendar: { open: true },
      };
      this.setLocalData();
    }
  }

  state = {
    sidebarVisible: false,
  };

  componentDidMount = () => {
    this.getLocalData();
    this.setState({ sidebarVisible: this.localData.sidebar.open });
  };

  switchSiderbarVisible = (sidebarVisible) => {
    this.getLocalData();
    this.localData.sidebar.open = sidebarVisible;
    this.setLocalData();
    this.setState({ sidebarVisible });
  };

  render() {
    return (
      <div className="App">
        <Topbar switchSiderbarVisible={this.switchSiderbarVisible} />
        <Searchbar />
        <Sidebar sidebarVisible={this.state.sidebarVisible} />

        {/* Footer Sign */}
        <div className="absolute right-2 bottom-2 italic text-sm text-main-600 dark:text-main-400">
          made by
          <a
            href="https://github.com/codeacme17"
            rel="noreferrer"
            target={"_blank"}
            className="pl-1.5 hover:text-main-900 hover:dark:text-main-200 ease-in-out duration-200"
          >
            leyoonafr.
          </a>
        </div>
      </div>
    );
  }
}
