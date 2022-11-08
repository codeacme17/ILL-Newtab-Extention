import React, { Component } from "react";

import SunIcon from "../../icons/sun";
import MoonIcon from "../../icons/moon";
import SideListIcon from "../../icons/sidelist";

export default class Topbar extends Component {
  getLocalData = () => {
    this.localData = JSON.parse(localStorage.getItem("_setting_data"));
  };

  setLocalData = () => {
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  state = {
    sidebarVisible: false,
    darkMode: Boolean,
    hasTodo: Boolean,
  };

  // Get dark mode state from localstorage
  componentDidMount = () => {
    this.getLocalData();
    this.setState({
      darkMode: this.localData.darkMode,
      sidebarVisible: this.localData.sidebar.open,
      hasTodo: !!this.localData.todo.list.length,
    });
    this.switchDarkClass(this.localData.darkMode);
  };

  // Show Sidebar switch button hanlder
  switchSiderbarVisible = () => {
    this.props.switchSiderbarVisible(!this.state.sidebarVisible);
    if (this.state.sidebarVisible) this.setState({ sidebarVisible: false });
    else this.setState({ sidebarVisible: true });
  };

  // Dark Mode switch button hanlder
  switchDarkMode = () => {
    this.getLocalData();
    this.localData.darkMode = !this.localData.darkMode;
    this.setState({ darkMode: this.localData.darkMode });
    this.switchDarkClass(this.localData.darkMode);
    this.setLocalData();
  };

  switchDarkClass = (flag) => {
    if (flag) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  render = () => {
    const { sidebarVisible, darkMode, hasTodo } = this.state;

    return (
      <section className="flex flex-row-reverse pt-5 px-7 fixed top-0 w-full items-center z-20">
        <button className="ml-5 relative" onClick={this.switchSiderbarVisible}>
          <SideListIcon sidebarVisible={sidebarVisible} />

          {hasTodo ? (
            <span className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-300 block absolute -top-0.5 -right-1.5">
              <span
                className="animate-ping absolute inline-flex rounded-full h-full w-full bg-amber-300 top-0 -right-0 opacity-70"
                style={{ animationIterationCount: "6" }}
              />
            </span>
          ) : (
            ""
          )}
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
