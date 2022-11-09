import React, { Component } from "react";
import "./index.scss";

export default class AddFavDialog extends Component {
  render() {
    return (
      <section className="dialog_container w-screen h-screen fixed top-0 left-0 flex justify-center items-start bg-main-100 dark:bg-main-900 dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm z-50">
        <div className="dialog_card w-96 bg-main-200 dark:bg-main-800 p-3 rounded-md shadow-lg mt-[120px]">
          <div className="font-semibold mt-1 mb-3 text-lg text-main-800 dark:text-main-100 select-none">
            Add new item
          </div>
          <div className="form_input">
            <label htmlFor="">Title</label>
            <input type="text" />
          </div>
          <div className="form_input">
            <label htmlFor="">Logo Url</label>
            <input type="text" />
          </div>
          <div className="form_input">
            <label htmlFor="">URL</label>
            <input type="text" />
          </div>
          <div className="form_input">
            <label htmlFor="">Short Key</label>
            <input type="text" />
          </div>

          <div className="flex">
            <button className="py-2 px-6 text-sm font-semibold mt-6 ml-auto select-none rounded-md bg-main-100 dark:bg-main-700 text-emerald-400 dark:text-emerald-500">
              Confirm
            </button>
          </div>
        </div>
      </section>
    );
  }
}
