import React, { Component } from "react";

import ModifyIcon from "icons/modify";
import DeleteIcon from "icons/delete";
import "./index.scss";

export default class SetMenu extends Component {
  closeMenu = (e) => {
    if (e.target.id !== "menu_container") return;
    this.props.switchMenuVisible(false);
  };

  modifyFavItem = () => {
    this.props.switchFavDialogVisible(true, "modify");
    this.props.switchMenuVisible(false);
  };

  deleteFavItem = () => {
    this.props.deleteItemformFavList(this.props.menuProps.item);
    this.props.switchMenuVisible(false);
  };

  render() {
    const { x, y } = this.props.menuProps;

    return (
      <section
        className="menu_container"
        id="menu_container"
        onMouseDown={this.closeMenu}
      >
        <div
          className="menu_card"
          id="menu_card"
          style={{ transform: [`translate(${x}px, ${y}px)`] }}
        >
          <div className="menu">
            <div className="menu_item" onClick={this.modifyFavItem}>
              <div className="mr-3">
                <ModifyIcon />
              </div>
              Modify
            </div>

            <div className="menu_item" onClick={this.deleteFavItem}>
              <div className="mr-3">
                <DeleteIcon />
              </div>
              Delete
            </div>
          </div>
        </div>
      </section>
    );
  }
}
