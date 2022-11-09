import React, { Component } from "react";
import { nanoid } from "nanoid";
import AddFavDialog from "../AddFav";
import PlusIcon from "../../../icons/plus";

export default class FavList extends Component {
  state = {
    addFavDialogVisible: false,
    favList: [
      {
        id: nanoid(),
        title: "google",
        url: "www.google.com",
        logoUrl: "www.google.com/favicon.ico",
        shortKey: "G",
      },
      {
        id: nanoid(),
        title: "TailwindCSS",
        url: "www.tailwindcss.com",
        logoUrl: "tailwindcss.com/favicons/android-chrome-192x192.png?v=3",
        shortKey: "tailwind",
      },
    ],
  };

  switchAddFavDialogVisible = (flag) => {
    this.setState({ addFavDialogVisible: flag });
  };

  addItemtoFavList = (item) => {
    let favList = this.state.favList;
    favList.push(item);
    this.setState(favList);
  };

  render() {
    const { addFavDialogVisible, favList } = this.state;

    return (
      <section className="flex flex-wrap text-main-700 dark:text-main-400">
        {/* Fav list item */}
        {favList.map((item) => {
          return (
            <a
              className="w-1/5 px-3 py-5 flex flex-col items-center rounded-md hover:bg-main-200 hover:dark:bg-main-800 cursor-pointer duration-100 ease-in-out"
              key={item.id}
              href={`https://${item.url}`}
            >
              <div className="w-12 h-12 rounded-full bg-main-300 dark:bg-main-700 flex justify-center items-center">
                <img src={`https://${item.logoUrl}`} alt="" className="w-8 h-8" />
              </div>
              <div className="text-xs mt-3 overflow-hidden w-24 truncate text-center select-none">
                {item.title}
              </div>
            </a>
          );
        })}

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
          <AddFavDialog
            switchAddFavDialogVisible={this.switchAddFavDialogVisible}
            addItemtoFavList={this.addItemtoFavList}
          />
        ) : (
          ""
        )}
      </section>
    );
  }
}
