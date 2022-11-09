import React, { Component } from "react";
import AddFavDialog from "../AddFav";
import PlusIcon from "../../../icons/plus";

export default class FavList extends Component {
  state = {
    addFavDialogVisible: false,
  };

  switchAddFavDialogVisible = (flag) => {
    this.setState({ addFavDialogVisible: flag });
  };

  render() {
    const { addFavDialogVisible } = this.state;

    return (
      <section className="flex text-main-700 dark:text-main-400">
        {/* Fav list item */}
        <div className="w-1/5 px-3 py-5 flex flex-col items-center rounded-md hover:bg-main-200 hover:dark:bg-main-800 cursor-pointer duration-100 ease-in-out">
          <div className="w-12 h-12 rounded-full bg-main-300 dark:bg-main-700 flex justify-center items-center">
            <img
              src="https://tailwindcss.com/favicons/android-chrome-192x192.png?v=3"
              alt=""
              className="w-8 h-8"
            />
          </div>
          <div className="text-xs mt-3 overflow-hidden w-24 truncate text-center select-none">
            tailwindcss
          </div>
        </div>

        {/* Add new list item */}
        <div
          className="w-1/5 px-3 py-5 flex flex-col items-center rounded-md hover:bg-main-200 hover:dark:bg-main-800 cursor-pointer"
          onClick={() => this.switchAddFavDialogVisible(true)}
        >
          <div className="w-12 h-12 rounded-full bg-main-300 dark:bg-main-700 flex justify-center items-center">
            <PlusIcon />
          </div>
          <div className="text-xs mt-3 overflow-hidden w-24 truncate text-center">ADD NEW</div>
        </div>

        {addFavDialogVisible ? (
          <AddFavDialog switchAddFavDialogVisible={this.switchAddFavDialogVisible} />
        ) : (
          ""
        )}
      </section>
    );
  }
}
