import React, { Component } from "react";
import SunIcon from "../../icons/sun";
import MoonIcon from "../../icons/moon";
import SideListIcon from "../../icons/sidelist";

export default class Topbar extends Component {
  state = {
    sidebarVisible: false,
    darkMode: Boolean,
  };

  // Show Sidebar switch button hanlder
  switchSiderbarVisible = () => {
    if (this.state.sidebarVisible) this.setState({ sidebarVisible: false });
    else this.setState({ sidebarVisible: true });
  };

  // Get dark mode state from localstorage
  localData = JSON.parse(localStorage.getItem("_setting_data"));
  componentDidMount = () => {
    if (typeof this.localData.darkMode !== "boolean") {
      this.localData.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.setItem("_setting_data", JSON.stringify(this.localData));
    } else {
      if (this.localData.darkMode) {
        document.documentElement.classList.add("dark");
        this.setState({ darkMode: true });
      } else {
        document.documentElement.classList.remove("dark");
        this.setState({ darkMode: false });
      }
    }
  };

  // Dark Mode switch button hanlder
  switchDarkMode = () => {
    if (this.state.darkMode) {
      document.documentElement.classList.remove("dark");
      this.localData.darkMode = false;
      this.setState({ darkMode: false });
    } else {
      document.documentElement.classList.add("dark");
      this.localData.darkMode = true;
      this.setState({ darkMode: true });
    }
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  render = () => {
    const { sidebarVisible, darkMode } = this.state;

    return (
      <section className="flex flex-row-reverse pt-5 px-7 fixed top-0 w-full items-center">
        <button className="ml-5" onClick={this.switchSiderbarVisible}>
          <SideListIcon sidebarVisible={sidebarVisible} />
        </button>

        {/* Switch Dark Mode Button */}
        <button
          className="bg-gray-100 shadow-inner dark:bg-main-700 rounded-full w-12 relative h-6"
          onClick={this.switchDarkMode}
        >
          <div
            className={`p-0.5 rounded-full w-[20px] h-[20px] flex justify-center items-center ease-in duration-200 
                        ${darkMode ? "translate-x-6" : "translate-x-1"}`}
          >
            {darkMode ? <MoonIcon /> : <SunIcon />}
          </div>
        </button>
      </section>
    );
  };
}
