import React, { createRef } from "react";

import StorageContainer from "container/Storage";
import FavDialog from "./FavDialog";
import SettingMenu from "./SettingMenu";
import PlusIcon from "icons/plus";

export default class FavList extends StorageContainer {
  state = {
    favList: [],
    favDialogVisible: false,
    dialogType: "",
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
    this.getLocalData();
    const fav = this.localData.fav;
    this.setState({ favList: fav.favList });
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

  switchFavDialogVisible = (flag, type) => {
    if (this.state.favList.length >= 19 && type === "add") return;
    this.setState({ favDialogVisible: flag, dialogType: type });
  };

  // Push fav item to the fav list
  addItemtoFavList = (item) => {
    this.getLocalData();
    let favList = this.state.favList;
    favList.push(item);
    this.localData.fav.favList = favList;
    this.setState(favList);
    this.setLocalData();
  };

  // Modify fav item from fav list
  modifyItemFormFavList = (item) => {
    this.getLocalData();
    const favList = this.state.favList;
    favList.forEach((favItem, index) => {
      if (favItem.id === item.id) favList[index] = item;
    });
    this.localData.fav.favList = favList;
    this.setState({ favList });
    this.setLocalData();
  };

  // Delete fav item from fav list
  deleteItemformFavList = (item) => {
    this.getLocalData();
    const favList = this.state.favList;
    favList.forEach((favItem, index) => {
      if (favItem.id === item.id) favList.splice(index, 1);
    });
    this.localData.fav.favList = favList;
    this.setState({ favList });
    this.setLocalData();
  };

  fetchPicError = (item, e) => {
    this.error = true;
    e.target.src = item.reserveLogoUrl;
  };

  render() {
    const { favDialogVisible, favList, favMenuVisible, menuProps, dialogType } =
      this.state;

    return (
      <section
        className="flex  flex-wrap text-main-700 dark:text-main-400"
        ref={this.FavListRef}
      >
        {/* Fav list item */}
        {favList.map((item) => {
          return (
            <a
              className="w-1/5 px-3 py-5 flex flex-col items-center rounded-md hover:bg-main-200 hover:dark:bg-main-800 cursor-pointer duration-100 ease-in-out  focus:bg-main-200 focus:dark:bg-main-800"
              key={item.id}
              href={`${item.url}`}
              onMouseDown={(e) => this.rightClickHandler(item, e)}
            >
              <div className="w-12 h-12 rounded-full bg-main-300 dark:bg-main-700 flex justify-center items-center">
                <img
                  src={`${item.logoUrl}`}
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
          onClick={() => this.switchFavDialogVisible(true, "add")}
          data-disabled={favList.length >= 19}
        >
          <div className="w-12 h-12 rounded-full bg-main-300 dark:bg-main-700 flex justify-center items-center">
            <PlusIcon />
          </div>
          <div className="text-xs mt-3 overflow-hidden w-24 truncate text-center">
            ADD NEW
          </div>
        </div>

        {/* Emit fav item dialog */}
        {favDialogVisible ? (
          <FavDialog
            switchFavDialogVisible={this.switchFavDialogVisible}
            addItemtoFavList={this.addItemtoFavList}
            modifyItemFormFavList={this.modifyItemFormFavList}
            dialogType={dialogType}
            itemProps={menuProps.item}
          />
        ) : (
          ""
        )}

        {/* Setting fav item right click menu */}
        {favMenuVisible ? (
          <SettingMenu
            switchMenuVisible={this.switchMenuVisible}
            deleteItemformFavList={this.deleteItemformFavList}
            switchFavDialogVisible={this.switchFavDialogVisible}
            menuProps={menuProps}
          />
        ) : (
          ""
        )}
      </section>
    );
  }
}
