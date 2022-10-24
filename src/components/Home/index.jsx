import React, { Component } from "react";
import SearchIcon from "../../icons/search";

export default class Home extends Component {
  TAG = "codeacme 17";

  render() {
    return (
      <section className="w-full">
        {/* Search Bar Container */}
        <section className="pt-[200px] text-center">
          {/* TAG */}
          <div className="text-4xl text-dark-200 font-black dark:text-zinc-400">
            {this.TAG.toUpperCase()}
          </div>

          {/* INPUT */}
          <label className="relative">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="mt-10 text-dark-300 bg-dark-200 outline-none rounded-3xl w-[560px] h-10 px-12 focus:rounded-md ease-in-out duration-300 text-md placeholder:text-dark-100 dark:placeholder:text-zinc-600 dark:text-zinc-400 border-2 border-black dark:border-zinc-500 dark:bg-zinc-800"
              placeholder="Search You Want"
            />
          </label>
        </section>
      </section>
    );
  }
}
