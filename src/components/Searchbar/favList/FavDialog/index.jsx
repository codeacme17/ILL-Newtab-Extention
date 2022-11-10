import React, { Component, createRef } from "react";
import { nanoid } from "nanoid";

import HelpIcon from "icons/help";
import Help from "./Help";
import "./index.scss";

export default class FavDialog extends Component {
  state = {
    favItem: {
      id: nanoid(),
      title: "",
      url: "",
      logoUrl: "",
      shortKey: "",
      reserveLogoUrl: "", // if logoUrl can not work, it will show this
    },
    btnDisabled: true,
    helpVisible: false,
    helpType: "title",
  };

  componentDidMount() {
    if (this.props.dialogType === "modify") {
      this.setState({ favItem: this.props.itemProps });
      this.modifyInputByProps();
      this.checkBtnDisabled(this.props.itemProps["title"], this.props.itemProps["url"]);
    }
  }

  // Refs relate to each input
  TitleRef = createRef();
  UrlRef = createRef();
  LogoUrlRef = createRef();
  ShortKeyRef = createRef();

  // Listen to the input value change
  changeInputHandler = (type, value) => {
    const favItem = { ...this.state.favItem };
    favItem[type] = value.trim();
    this.setState({ favItem });
    this.checkBtnDisabled(favItem["title"], favItem["url"]);
  };

  // Modify each value of input element
  // if the dialog type is "modify"
  modifyInputByProps = () => {
    const InputRefs = {
      title: this.TitleRef,
      url: this.UrlRef,
      logoUrl: this.LogoUrlRef,
      shortKey: this.ShortKeyRef,
    };
    for (const key in InputRefs) {
      InputRefs[key].current.value = this.props.itemProps[key];
    }
  };

  // Check the confirm button is disabled
  // depend by the value of 'title' & 'url'
  checkBtnDisabled = (titleValue, urlValue) => {
    if (!!titleValue && !!urlValue) this.setState({ btnDisabled: false });
    else this.setState({ btnDisabled: true });
  };

  // Create an auto-generated icon by canvas
  // insert the url to the state
  createReserveLogo = () => {
    const favItem = this.state.favItem;
    const canvas = this.drawReserveLogo(favItem);
    const canvasURL = canvas.toDataURL("image/webp");
    favItem.reserveLogoUrl = canvasURL;
    this.setState({ favItem });
  };

  // Draw an auto-generated icon
  drawReserveLogo = (favItem) => {
    const canvas = document.createElement("canvas");
    canvas.width = 28;
    canvas.height = 28;

    const bgCtx = canvas.getContext("2d");
    bgCtx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    bgCtx.fillStyle = `hsl(${Math.random() * 1000}, 70%, 50%)`;
    bgCtx.fill();

    const textCtx = canvas.getContext("2d");
    textCtx.shadowColor = "rgba(0, 0, 0, 0.2)";
    textCtx.shadowOffsetX = 2;
    textCtx.shadowOffsetY = 2;
    textCtx.font = "bold 17px Poppins";
    textCtx.fillStyle = "white";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.fillText(
      favItem.title.substr(0, 1).toUpperCase(),
      canvas.width / 2,
      canvas.height / 2 + canvas.height / 16
    );
    return canvas;
  };

  // Confirm button handler
  confirmHandler = () => {
    if (this.props.dialogType === "add") {
      this.createReserveLogo();
      this.props.addItemtoFavList(this.state.favItem);
    } else {
      this.props.modifyItemFormFavList(this.state.favItem);
    }
    this.props.switchFavDialogVisible(false);
  };

  // Close dialog (mask layer only)
  // emit to the parent's favDialogVisible property
  closeDialog = (e) => {
    if (e.target.id === "dialog_container") this.props.switchFavDialogVisible(false);
  };

  // Switch the visiblity of help component
  switchHelpVisible = () => {
    this.setState({ helpType: "title", helpVisible: !this.state.helpVisible });
  };

  // Switch the type of help component
  switchHelpType = (type) => {
    if (!this.state.helpVisible) return;
    this.setState({ helpType: type });
  };

  render() {
    const { btnDisabled, helpVisible, helpType } = this.state;
    const { dialogType } = this.props;

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
              {dialogType === "add" ? "Add new item" : "Modify item"}
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
                ref={this.TitleRef}
                type="text"
                placeholder="Google"
                onFocus={() => this.switchHelpType("title")}
                onChange={(e) => this.changeInputHandler("title", e.target.value)}
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
                ref={this.UrlRef}
                type="text"
                placeholder="www.google.com"
                onFocus={() => this.switchHelpType("url")}
                onChange={(e) => this.changeInputHandler("url", e.target.value)}
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
                ref={this.LogoUrlRef}
                type="text"
                placeholder="www.google.com/favicon.ico"
                onFocus={() => this.switchHelpType("logoUrl")}
                onChange={(e) => this.changeInputHandler("logoUrl", e.target.value)}
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
                ref={this.ShortKeyRef}
                type="text"
                placeholder="G"
                onFocus={() => this.switchHelpType("shortKey")}
                onChange={(e) => this.changeInputHandler("shortKey", e.target.value)}
              />
            </div>

            {/* Confirm buttom */}
            <div className="flex flex-row-reverse items-center mt-6">
              <button
                className="py-2 px-6 text-sm font-semiboldml-auto select-none rounded-md bg-main-100 dark:bg-main-700 text-emerald-400 dark:text-emerald-500 font-semibold"
                disabled={btnDisabled}
                onClick={this.confirmHandler}
              >
                Confirm
              </button>

              {dialogType === "add" ? (
                <button className="ml-auto mr-3" onClick={this.switchHelpVisible}>
                  <HelpIcon />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Help Container */}
          <Help helpVisible={helpVisible} helpType={helpType} />
        </div>
      </section>
    );
  }
}
