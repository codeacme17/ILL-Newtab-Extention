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
  };

  // Get dark mode state from localstorage
  componentDidMount = () => {
    this.getLocalData();
    this.setState({
      darkMode: this.localData.darkMode,
      sidebarVisible: this.localData.sidebar.open,
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
