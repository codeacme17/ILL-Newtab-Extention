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
              What is{" "}
              <span className="text-emerald-500 font-semibold italic">
                Title
              </span>{" "}
              ?
            </div>
            <div className="dark:text-main-100">
              <span className="block italic mb-2 text-sm text-rose-500 dark:text-rose-400">
                * required
              </span>
              Title is a string that can represent your favorite link. The title
              you set will be displayed under the logo.
            </div>
          </div>
        ) : (
          ""
        )}

        {helpType === "url" ? (
          <div>
            <div className="mb-2 ">
              What is{" "}
              <span className="text-emerald-500 font-semibold italic">URL</span>{" "}
              ?
            </div>
            <div className="dark:text-main-100">
              <span className="block italic mb-2 text-sm text-rose-500 dark:text-rose-400">
                * required
              </span>
              URL is the address of your favorite website.
              <br />
              To set it, you can directly click the label to jump to the
              corresponding page.
            </div>
          </div>
        ) : (
          ""
        )}

        {helpType === "logoUrl" ? (
          <div>
            <div className="mb-2 ">
              What is{" "}
              <span className="text-emerald-500 font-semibold italic">
                Logo URL
              </span>{" "}
              ?
            </div>
            <div className="dark:text-main-100">
              Title is a shortcut to the identity of the name, you can customize
              it for easy recognition of your shortcut.
              <br />
              Of course, you can also choose not to fill in this item, which
              will display the automatically generated logo.
            </div>
          </div>
        ) : (
          ""
        )}

        {helpType === "shortKey" ? (
          <div>
            <div className="mb-2 ">
              What is{" "}
              <span className="text-emerald-500 font-semibold italic">
                Short Key
              </span>{" "}
              ?
            </div>
            <div className="dark:text-main-100">
              After you fill in this item, you can enter this value in the
              search box to quickly jump.
              <br />
              That is, you will not enter the engine search.
              <video autoPlay loop muted className="mt-4 rounded-lg shadow-xl">
                <source src="/video/shortkey-demo.mp4" />
              </video>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
