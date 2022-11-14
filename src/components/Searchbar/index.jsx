import React, { Component } from "react";

import FavList from "./FavList";
import SearchIcon from "icons/search";
import BingIcon from "icons/bing";
import GoogleIcon from "icons/google";
import BaiduIcon from "icons/baidu";
import ArrowdownIcon from "icons/arrowdown";

export default class Search extends Component {
  getLocalData = () => {
    this.localData = JSON.parse(localStorage.getItem("_setting_data"));
  };

  setLocalData = () => {
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  BING_URL = "https://www.bing.com/search?q=";
  GOOGLE_URL = "https://www.google.com/search?q=";
  BAIDU_URL = "https://www.baidu.com/s?wd=";

  state = {
    searchEngine: this.BING_URL,
    favListVisible: true,
    logoUrl: "",
  };

  // Mount search engine
  componentDidMount = () => {
    this.getLocalData();
    this.switchSearchEngine(this.localData.searchEngine);
    this.setState({ favListVisible: this.localData.fav.open });
    this.keyPressHandler();
  };

  keyPressHandler = () => {
    window.addEventListener("keydown", (e) => {
      this.isCtrlOrCommit = e.ctrlKey;
      if (this.isCtrlOrCommit && e.key === "k") {
        e.preventDefault();
        this.searchRef.focus();
      }
      this.isCtrlOrCommit = false;
    });
  };

  // Switch search engine
  switchSearchEngine = (type) => {
    switch (type) {
      case "bing":
        this.setState({ searchEngine: this.BING_URL });
        break;
      case "google":
        this.setState({ searchEngine: this.GOOGLE_URL });
        break;
      case "baidu":
        this.setState({ searchEngine: this.BAIDU_URL });
        break;
      default:
        break;
    }
    // Modify search engine type of localstorage
    this.getLocalData();
    this.localData.searchEngine = type;
    this.setLocalData();
  };

  // onchange event handler in search input element
  inputChangeHandler = (inputValue) => {
    this.checkIsShortKey(inputValue);
  };
  // Check the value of user inputted is or not a short key
  checkIsShortKey = (inputValue) => {
    this.getLocalData();
    this.setState({ logoUrl: "" });
    this.searchUrl = "";
    const favList = this.localData.fav.favList;
    favList.forEach((item) => {
      if (item.shortKey.toLowerCase() === inputValue.toLowerCase() && !!inputValue.trim()) {
        this.setState({ logoUrl: item.logoUrl || item.reserveLogoUrl });
        this.searchUrl = item.url;
      }
    });
  };

  // onkeyup event handler in search input element
  inputKeyupHandler = (e) => {
    let inputValue = e.target.value;
    if (e.keyCode === 13 && inputValue.trim()) {
      this.search(inputValue);
    }
  };
  search = (inputValue) => {
    if (!!this.searchUrl) window.location = `${this.searchUrl}`;
    else window.location = this.state.searchEngine + inputValue;
  };

  // Switch FavList component visible state
  switchFavListVisible = () => {
    this.getLocalData();
    this.localData.fav.open = !this.state.favListVisible;
    this.setState({ favListVisible: !this.state.favListVisible });
    this.setLocalData();
  };

  render() {
    const { searchEngine, favListVisible, logoUrl } = this.state;

    return (
      <section className="w-[620px] mx-auto flex flex-col relative">
        {/* Search Container */}
        <div
          className={`duration-200 transition-[margin-top] ${
            favListVisible ? "mt-[150px]" : "mt-[240px]"
          }`}
        >
          {/* Search Input */}
          <label className="relative block z-10">
            <span className="absolute top-3 left-4">
              {!!logoUrl ? <img src={`${logoUrl}`} alt="" className="w-6 h-6" /> : <SearchIcon />}
            </span>

            {/* Input bar */}
            <input
              type="text"
              className="w-full h-12 pl-[53px] pr-32 text-dark-300 outline-none rounded-3xl ease-in-out duration-200 dark:text-main-400 border-[1px] border-black shadow-inner dark:border-main-500 dark:bg-main-800 placeholder:text-sm placeholder:leading-12 placeholder:text-dark-100 dark:placeholder:text-main-600 focus:rounded-md"
              placeholder="SEARCH YOU WANT"
              ref={(c) => (this.searchRef = c)}
              style={{ fontSize: "16px" }}
              onKeyUp={(e) => this.inputKeyupHandler(e)}
              onChange={(e) => this.inputChangeHandler(e.target.value)}
            />

            {/* Search engine btns */}
            <div className="absolute top-3 right-3 flex items-center ease-in-out duration-300 transition-[fill,opacity]">
              <button
                className={`mr-2 ${
                  searchEngine === this.BING_URL
                    ? "fill-sky-500 dark:fill-sky-700"
                    : "dark:fill-main-400"
                }`}
                onClick={() => this.switchSearchEngine("bing")}
              >
                <BingIcon />
              </button>
              <button
                className={`mr-2 ${
                  searchEngine === this.GOOGLE_URL
                    ? "fill-sky-500 dark:fill-sky-700"
                    : "dark:fill-main-400"
                }`}
                onClick={() => this.switchSearchEngine("google")}
              >
                <GoogleIcon />
              </button>
              <button
                className={`mr-2 ${
                  searchEngine === this.BAIDU_URL
                    ? "fill-sky-500 dark:fill-sky-700"
                    : "dark:fill-main-400"
                }`}
                onClick={() => this.switchSearchEngine("baidu")}
              >
                <BaiduIcon />
              </button>
            </div>
          </label>

          {/* Trigger Fav List Button */}
          <div
            onClick={this.switchFavListVisible}
            className="cursor-pointer absolute w-full rounded-xl mt-3 hover:bg-main-200 hover:dark:bg-main-800 duration-200 opacity-40 transition-background flex justify-center delay-100"
          >
            <div className={`${favListVisible ? "rotate-180" : "rotate-0"}`}>
              <ArrowdownIcon />
            </div>
          </div>
        </div>

        {/* Fav List */}
        <div
          className={`mt-10 overflow-y-scroll duration-300 ease-in-out transition-[opacity] ${
            favListVisible ? "opacity-100" : "h-0 opacity-0"
          }`}
        >
          <FavList />
        </div>
      </section>
    );
  }
}
