import React, { Component, useEffect } from "react";
import { nanoid } from "nanoid";
import HelpIcon from "../../../icons/help";
import Help from "./Help";
import "./index.scss";

export default class AddFavDialog extends Component {
  state = {
    favItem: {
      id: nanoid(),
      title: "",
      url: "",
      logoUrl: "",
      shortKey: "",
    },
    btnDisabled: true,
    helpVisible: true,
    helpType: "title",
  };

  closeDialog = (e) => {
    if (e.target.id === "dialog_container") this.props.switchAddFavDialogVisible(false);
  };

  changeInputHandler = (type, e) => {
    let favItem = { ...this.state.favItem };
    favItem[type] = e.target.value.trim();
    this.setState({ favItem });
    this.checkBtnDisabled(favItem["title"], favItem["url"]);
  };

  checkBtnDisabled = (titleValue, urlValue) => {
    if (!!titleValue && !!urlValue) this.setState({ btnDisabled: false });
    else this.setState({ btnDisabled: true });
  };

  confirmAddItem = () => {
    this.props.addItemtoFavList(this.state.favItem);
    this.props.switchAddFavDialogVisible(false);
  };

  switchHelpVisible = () => {
    this.setState({ helpType: "title", helpVisible: !this.state.helpVisible });
  };

  switchHelpType = (type) => {
    if (!this.state.helpVisible) return;
    this.setState({ helpType: type });
  };

  render() {
    const { btnDisabled, helpVisible, helpType } = this.state;

    return (
      <section className="dialog_container" onClick={this.closeDialog} id="dialog_container">
        {/* Add new item container */}
        <div className="dialog_card">
          <div
            className="w-96 mr-3 bg-main-200 dark:bg-main-800 p-3 rounded-md shadow-lg"
            id="dialog_card"
          >
            {/* Header */}
            <div className="font-semibold mt-1 mb-3 text-lg text-main-800 dark:text-main-100 select-none">
              Add new item
            </div>

            {/* Title Input */}
            <div className="form_input">
              <label
                aria-required
                onClick={() => this.switchHelpType("title")}
                className={`${helpVisible ? "cursor-pointer" : ""} 
									${helpVisible && helpType === "title" ? "text-emerald-500" : ""}`}
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Google"
                onFocus={() => this.switchHelpType("title")}
                onChange={(e) => this.changeInputHandler("title", e)}
              />
            </div>

            {/* URL Input */}
            <div className="form_input">
              <label
                aria-required
                onClick={() => this.switchHelpType("url")}
                className={`${helpVisible ? "cursor-pointer" : ""}
									${helpVisible && helpType === "url" ? "text-emerald-500" : ""}`}
              >
                URL
              </label>
              <input
                type="text"
                placeholder="www.google.com"
                onFocus={() => this.switchHelpType("url")}
                onChange={(e) => this.changeInputHandler("url", e)}
              />
            </div>

            {/* Logo URL Input */}
            <div className="form_input">
              <label
                onClick={() => this.switchHelpType("logoUrl")}
                className={`${helpVisible ? "cursor-pointer" : ""}
									${helpVisible && helpType === "logoUrl" ? "text-emerald-500" : ""}`}
              >
                Logo Url
              </label>
              <input
                type="text"
                placeholder="www.google.com/favicon.ico"
                onFocus={() => this.switchHelpType("logoUrl")}
                onChange={(e) => this.changeInputHandler("logoUrl", e)}
              />
            </div>

            {/* Short Key Input */}
            <div className="form_input">
              <label
                onClick={() => this.switchHelpType("shortKey")}
                className={`${helpVisible ? "cursor-pointer" : ""}
									${helpVisible && helpType === "shortKey" ? "text-emerald-500" : ""}`}
              >
                Short Key
              </label>
              <input
                type="text"
                placeholder="G"
                onFocus={() => this.switchHelpType("shortKey")}
                onChange={(e) => this.changeInputHandler("shortKey", e)}
              />
            </div>

            {/* Confirm buttom */}
            <div className="flex items-center mt-6">
              <button className="ml-auto mr-3" onClick={this.switchHelpVisible}>
                <HelpIcon />
              </button>
              <button
                className="py-2 px-6 text-sm font-semiboldml-auto select-none rounded-md bg-main-100 dark:bg-main-700 text-emerald-400 dark:text-emerald-500 font-semibold"
                disabled={btnDisabled}
                onClick={this.confirmAddItem}
              >
                Confirm
              </button>
            </div>
          </div>

          {/* Help Container */}
          <Help helpVisible={helpVisible} helpType={helpType} />
        </div>
      </section>
    );
  }
}
