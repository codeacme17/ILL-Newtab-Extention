import React, { Component } from "react";
import SunIcon from "../../icons/sun";
import MoonIcon from "../../icons/moon";

export default class Topbar extends Component {
  constructor() {
    super();

    this.state = {
      darkMode: true,
    };
  }

  // Get dark mode state from localstorage
  componentDidMount = () => {
    const localDarkMode = localStorage.getItem("dark");
    if (localDarkMode && localDarkMode === "false") {
      document.documentElement.classList.remove("dark");
      this.setState({ darkMode: false });
    } else if (localDarkMode && localDarkMode === "true") {
      document.documentElement.classList.add("dark");
      this.setState({ darkMode: true });
    }
  };

  // Dark Mode Hanlder
  switchDarkMode = () => {
    this.setState((state) => {
      if (state.darkMode) return { darkMode: false };
      else return { darkMode: true };
    });

    if (this.state.darkMode) {
      document.documentElement.classList.remove("dark");
      this.setState({ darkMode: false });
      localStorage.setItem("dark", "false");
    } else {
      document.documentElement.classList.add("dark");
      this.setState({ darkMode: true });
      localStorage.setItem("dark", "true");
    }
  };

  render = () => {
    return (
      <section className="flex flex-row-reverse pt-5 px-7 fixed top-0 w-full">
        {/* Switch Dark Mode Button */}
        <button
          className="bg-gray-100 shadow-inner dark:bg-main-700 rounded-full w-12 relative h-6"
          onClick={this.switchDarkMode}
        >
          <div
            className={`p-0.5 rounded-full w-[20px] h-[20px] flex justify-center items-center ease-in duration-200 
                        ${this.state.darkMode ? "translate-x-6" : "translate-x-1"}`}
          >
            {this.state.darkMode ? <SunIcon /> : <MoonIcon />}
          </div>
        </button>
      </section>
    );
  };
}
