import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

export default class App extends Component {
  constructor() {
    super();

    // Init localStorage data
    const localSettingData = localStorage.getItem("_setting_data");
    if (!localSettingData)
      localStorage.setItem(
        "_setting_data",
        JSON.stringify({
          darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
          searchEngine: "bing",
        })
      );
  }

  render() {
    return (
      <div className="App">
        <Topbar />
        <Searchbar />
        <Sidebar />

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
