import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

export default class App extends Component {
  constructor() {
    super();
    // Init local storage data
    const localData = localStorage.getItem("_setting_data");
    if (!localData)
      localStorage.setItem(
        "_setting_data",
        JSON.stringify({
          darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
          searchEngine: "bing",
          sidebar: {
            open: false,
          },
          weather: {
            open: true,
          },
          todo: {
            open: true,
            list: [],
          },
          calendar: {
            open: true,
          },
        })
      );
  }

  state = {
    sidebarVisible: false,
  };

  componentDidMount = () => {
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    this.setState({ sidebarVisible: localData.sidebar.open });
  };

  switchSiderbarVisible = (sidebarVisible) => {
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    localData.sidebar.open = sidebarVisible;
    localStorage.setItem("_setting_data", JSON.stringify(localData));
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
