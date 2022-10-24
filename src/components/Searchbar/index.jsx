import React, { Component, createRef } from "react";
import SearchIcon from "../../icons/search";

export default class Search extends Component {
  constructor() {
    super();
    this.InputRef = createRef();
  }

  // Use Bing To Search
  BING_URL = "https://cn.bing.com/search?q=";
  search = (e) => {
    let inputValue = this.InputRef.current.value;
    if (e.keyCode === 13 && inputValue.trim()) {
      window.location = this.BING_URL + inputValue;
    }
  };

  render() {
    const TAG = "codeacme 17";

    return (
      <section className="w-full">
        {/* Search Bar Container */}
        <section className="py-[200px] text-center">
          {/* TAG */}
          <div className="text-4xl text-dark-200 font-black dark:text-main-400">
            {TAG.toUpperCase()}
          </div>

          {/* INPUT */}
          <label className="relative">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="mt-10 w-[560px] h-10 px-12 
                         text-dark-300 outline-none rounded-3xl focus:rounded-md ease-in-out duration-200 text-md dark:text-main-400 border-[1px] border-black shadow-inner dark:border-main-500 dark:bg-main-800 placeholder:text-sm placeholder:text-dark-100 dark:placeholder:text-main-600 transition-[border]"
              placeholder="Search You Want"
              ref={this.InputRef}
              onKeyUp={this.search}
            />
          </label>
        </section>
      </section>
    );
  }
}
