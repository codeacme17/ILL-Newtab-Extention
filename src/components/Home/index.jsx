import React, { Component } from "react";
import SearchIcon from "../../icons/search";

export default class Home extends Component {
  TAG = "codeacme17";

  render() {
    return (
      <section className="w-full">
        {/* Search Bar Container */}
        <section className="pt-[30%] text-center">
          {/* TAG */}
          <div className="text-4xl text-dark-200 font-black">{this.TAG.toUpperCase()}</div>

          {/* INPUT */}
          <label className="relative">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="mt-10 text-dark-300 bg-dark-200 outline-none rounded-3xl w-[560px] h-10 px-12 focus:rounded-md ease-in-out duration-300 text-md placeholder:text-dark-100 border-2 border-black dark:boder-0"
              placeholder="Search You Want"
            />
          </label>
        </section>
      </section>
    );
  }
}
