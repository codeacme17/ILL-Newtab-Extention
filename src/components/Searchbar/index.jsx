import React, { Component, createRef } from "react";
import SearchIcon from "../../icons/search";
import BingIcon from "../../icons/bing";
import GoogleIcon from "../../icons/google";
import BaiduIcon from "../../icons/baidu";

export default class Search extends Component {
  // Use Bing To Search
  BING_URL = "https://www.bing.com/search?q=";
  GOOGLE_URL = "https://www.google.com/search?q=";
  BAIDU_URL = "https://www.baidu.com/s?wd=";
  InputRef = createRef();
  search = (e) => {
    let inputValue = this.InputRef.current.value;
    if (e.keyCode === 13 && inputValue.trim()) {
      window.location = this.state.searchEngine + inputValue;
    }
  };

  state = {
    searchEngine: this.BING_URL,
  };
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
  };

  render() {
    const TAG = "codeacme 17";
    const { searchEngine } = this.state;
    return (
      <section className="w-full py-[200px] flex flex-col items-center">
        {/* TAG */}
        <div className="text-4xl text-dark-200 font-black dark:text-main-400">
          {TAG.toUpperCase()}
        </div>

        {/* INPUT */}
        <label className="relative block overflow-hidden mt-10">
          <span className="absolute top-2 left-3.5">
            <SearchIcon />
          </span>

          <input
            type="text"
            className="w-[560px] h-10 pl-12 pr-32 text-dark-300 outline-none rounded-3xl ease-in-out duration-200 text-md dark:text-main-400 border-[1px] border-black shadow-inner dark:border-main-500 dark:bg-main-800 placeholder:text-sm placeholder:text-dark-100 dark:placeholder:text-main-600 focus:rounded-md"
            placeholder="Search You Want"
            ref={this.InputRef}
            onKeyUp={this.search}
          />

          <div className="absolute top-2 right-5 flex items-center ease-in-out duration-300">
            <button
              className={`mr-2 ${
                searchEngine === this.BING_URL
                  ? "fill-sky-300 dark:fill-sky-700"
                  : "dark:fill-main-400"
              }`}
              onClick={() => this.switchSearchEngine("bing")}
            >
              <BingIcon />
            </button>
            <button
              className={`mr-2 ${
                searchEngine === this.GOOGLE_URL
                  ? "fill-sky-300 dark:fill-sky-700"
                  : "dark:fill-main-400"
              }`}
              onClick={() => this.switchSearchEngine("google")}
            >
              <GoogleIcon />
            </button>
            <button
              className={`mr-2 ${
                searchEngine === this.BAIDU_URL
                  ? "fill-sky-300 dark:fill-sky-700"
                  : "dark:fill-main-400"
              }`}
              onClick={() => this.switchSearchEngine("baidu")}
            >
              <BaiduIcon />
            </button>
          </div>
        </label>
      </section>
    );
  }
}
