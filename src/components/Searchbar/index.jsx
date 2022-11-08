import React, { Component, createRef } from "react";

import FavList from "./favList/index";
import SearchIcon from "../../icons/search";
import BingIcon from "../../icons/bing";
import GoogleIcon from "../../icons/google";
import BaiduIcon from "../../icons/baidu";

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
  };

  // Mount search engine
  componentDidMount = () => {
    this.getLocalData();
    this.switchSearchEngine(this.localData.searchEngine);
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

  // Search Event
  InputRef = createRef();
  search = (e) => {
    let inputValue = this.InputRef.current.value;
    if (e.keyCode === 13 && inputValue.trim()) {
      window.location = this.state.searchEngine + inputValue;
    }
  };

  // Switch FavList component visible state
  switchFavListVisible = () => {
    this.setState({ favListVisible: !this.state.favListVisible });
  };

  render() {
    const { searchEngine, favListVisible } = this.state;

    return (
      <section className="w-[620px] mx-auto flex flex-col relative">
        {/* Search Container */}
        <div
          className={`duration-200 transition-[margin-top] ${
            favListVisible ? "mt-[100px]" : "mt-[200px]"
          }`}
        >
          {/* Search Input */}
          <label className="relative block z-10">
            <span className="absolute top-3 left-3.5">
              <SearchIcon />
            </span>

            <input
              type="text"
              className="w-full h-12 pl-12 pr-32 text-dark-300 outline-none rounded-3xl ease-in-out duration-200 dark:text-main-400 border-[1px] border-black shadow-inner dark:border-main-500 dark:bg-main-800 placeholder:text-sm placeholder:leading-12 placeholder:text-dark-100 dark:placeholder:text-main-600 focus:rounded-md"
              placeholder="SEARCH YOU WANT"
              style={{ fontSize: "16px" }}
              ref={this.InputRef}
              onKeyUp={this.search}
            />

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
            className="cursor-pointer absolute w-full rounded-lg h-3 mt-3 dark:border-main-500 border-[1px]"
          >
            Fav List
          </div>
        </div>

        {/* Fav List */}
        {favListVisible ? (
          <div className="mt-10">
            <FavList />
          </div>
        ) : (
          {
            /* empty */
          }
        )}
      </section>
    );
  }
}
