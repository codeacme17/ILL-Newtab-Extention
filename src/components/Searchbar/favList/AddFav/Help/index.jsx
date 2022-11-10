import React, { Component } from "react";

export default class Help extends Component {
  render() {
    const { helpVisible, helpType } = this.props;

    return (
      <div
        className={`h-[392px] bg-main-200 dark:bg-main-800 rounded-md overflow-hidden shadow-lg duration-200 ease-in-out transition-width ${
          helpVisible ? "w-60 p-3 opacity-100" : "w-0 p-0 opacity-0"
        }`}
        id="dialog_help"
      >
        <div className="font-semibold flex items-center mt-1 mb-3 text-lg text-main-800 dark:text-main-100 select-none">
          HELP
        </div>

        {helpType === "title" ? (
          <div>
            <div className="mb-2 ">
              What is <span className="text-emerald-500 font-semibold italic">Title</span> ?
            </div>
            <div className="dark:text-main-100">
              Title is a shortcut to the identity of the name, you can customize it for easy
              recognition of your shortcut.
            </div>
          </div>
        ) : (
          ""
        )}

        {helpType === "url" ? (
          <div>
            <div className="mb-2 ">
              What is <span className="text-emerald-500 font-semibold italic">URL</span> ?
            </div>
            <div className="dark:text-main-100">
              Title is a shortcut to the identity of the name, you can customize it for easy
              recognition of your shortcut.
            </div>
          </div>
        ) : (
          ""
        )}

        {helpType === "logoUrl" ? (
          <div>
            <div className="mb-2 ">
              What is <span className="text-emerald-500 font-semibold italic">Logo URL</span> ?
            </div>
            <div className="dark:text-main-100">
              Title is a shortcut to the identity of the name, you can customize it for easy
              recognition of your shortcut.
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
