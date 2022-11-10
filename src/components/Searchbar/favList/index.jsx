import React, { Component, createRef } from "react";
import { nanoid } from "nanoid";

import FavDialog from "./FavDialog";
import SettingMenu from "./SettingMenu";
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
        reserveLogoUrl: "https://developer.mozilla.org/favicon-192x192.png",
      },
      {
        id: nanoid(),
        title: "TailwindCSS",
        url: "www.tailwindcss.com",
        logoUrl: "tailwindcss.com/favicons/android-chrome-192x192.png?v=3",
        shortKey: "tailwind",
        reserveLogoUrl: "",
      },
    ],

    favMenuVisible: false,
    menuProps: {
      x: 0,
      y: 0,
      item: {},
    },
  };

  FavListRef = createRef();
  componentDidMount() {
    // Prevent right click event in FavList element
    this.FavListRef.current.oncontextmenu = function (e) {
      e.preventDefault();
    };
  }

  switchMenuVisible = (flag) => {
    this.setState({ favMenuVisible: flag });
  };

  // Right click event handler
  rightClickHandler = (item, e) => {
    if (e.button !== 2) return;
    const menuProps = this.state.menuProps;
    menuProps.x = e.clientX;
    menuProps.y = e.clientY;
    menuProps.item = item;
    this.switchMenuVisible(true);
    this.setState({ menuProps });
  };

  switchAddFavDialogVisible = (flag) => {
    this.setState({ addFavDialogVisible: flag });
  };

  // Push fav item to the fav list
  addItemtoFavList = (item) => {
    let favList = this.state.favList;
    favList.push(item);
    this.setState(favList);
  };

  // Delete fav item from fav list
  deleteItemformFavList = (item) => {
    const favList = this.state.favList;
    favList.forEach((favItem, index) => {
      if (favItem.id === item.id) favList.splice(index, 1);
    });
    this.setState({ favList });
  };

  fetchPicError = (item, e) => {
    this.error = true;
    e.target.src = item.reserveLogoUrl;
  };

  render() {
    const { addFavDialogVisible, favList, favMenuVisible, menuProps } = this.state;

    return (
      <section className="flex  flex-wrap text-main-700 dark:text-main-400" ref={this.FavListRef}>
        {/* Fav list item */}
        {favList.map((item) => {
          return (
            <a
              className="w-1/5 px-3 py-5 flex flex-col items-center rounded-md hover:bg-main-200 hover:dark:bg-main-800 cursor-pointer duration-100 ease-in-out  focus:bg-main-200 focus:dark:bg-main-800"
              key={item.id}
              href={`https://${item.url}`}
              onMouseDown={(e) => this.rightClickHandler(item, e)}
            >
              <div className="w-12 h-12 rounded-full bg-main-300 dark:bg-main-700 flex justify-center items-center">
                <img
                  src={`https://${item.logoUrl}`}
                  onError={(e) => this.fetchPicError(item, e)}
                  alt=""
                  className="w-6 h-6"
                />
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

        {/* Add fav item dialog */}
        {addFavDialogVisible ? (
          <FavDialog
            switchAddFavDialogVisible={this.switchAddFavDialogVisible}
            addItemtoFavList={this.addItemtoFavList}
          />
        ) : (
          ""
        )}

        {/* Setting fav item right click menu */}
        {favMenuVisible ? (
          <SettingMenu
            menuProps={menuProps}
            switchMenuVisible={this.switchMenuVisible}
            deleteItemformFavList={this.deleteItemformFavList}
          />
        ) : (
          ""
        )}
      </section>
    );
  }
}
