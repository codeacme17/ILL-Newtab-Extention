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
  componentDidMount = () => {
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    this.setState({ darkMode: localData.darkMode });
    this.switchDarkClass(localData.darkMode);
  };

  // Dark Mode switch button hanlder
  switchDarkMode = () => {
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    localData.darkMode = !localData.darkMode;
    this.setState({ darkMode: localData.darkMode });
    this.switchDarkClass(localData.darkMode);
    localStorage.setItem("_setting_data", JSON.stringify(localData));
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
