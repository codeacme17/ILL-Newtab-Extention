import React, { Component } from "react";
import HelpIcon from "../../../icons/help";
import Help from "./Help";
import "./index.scss";

export default class AddFavDialog extends Component {
  state = {
    helpVisible: true,
    helpType: "title",
  };

  closeDialog = (e) => {
    if (e.target.id === "dialog_container") this.props.switchAddFavDialogVisible(false);
  };

  switchHelpVisible = () => {
    this.setState({ helpVisible: !this.state.helpVisible });
  };

  switchHelpType = (type) => {
    if (!this.state.helpVisible) return;
    this.setState({ helpType: type });
  };

  render() {
    const { helpVisible, helpType } = this.state;

    return (
      <section className="dialog_container" onClick={this.closeDialog} id="dialog_container">
        <div className="dialog_card">
          <div
            className="w-96 mr-3 bg-main-200 dark:bg-main-800 p-3 rounded-md shadow-lg"
            id="dialog_card"
          >
            <div className="font-semibold mt-1 mb-3 text-lg text-main-800 dark:text-main-100 select-none">
              Add new item
            </div>
            <div className="form_input">
              <label
                onClick={() => this.switchHelpType("title")}
                className={`${helpVisible ? "cursor-pointer" : ""} 
									${helpVisible && helpType === "title" ? "text-emerald-500" : ""}`}
              >
                Title
              </label>
              <input type="text" placeholder="Google" />
            </div>
            <div className="form_input">
              <label
                onClick={() => this.switchHelpType("url")}
                className={`${helpVisible ? "cursor-pointer" : ""}
									${helpVisible && helpType === "url" ? "text-emerald-500" : ""}`}
              >
                URL
              </label>
              <input type="text" placeholder="www.google.com" />
            </div>
            <div className="form_input">
              <label
                onClick={() => this.switchHelpType("logoUrl")}
                className={`${helpVisible ? "cursor-pointer" : ""}
									${helpVisible && helpType === "logoUrl" ? "text-emerald-500" : ""}`}
              >
                Logo Url
              </label>
              <input type="text" placeholder="www.google.com/favicon.ico" />
            </div>
            <div className="form_input">
              <label
                onClick={() => this.switchHelpType("shortKey")}
                className={`${helpVisible ? "cursor-pointer" : ""}
									${helpVisible && helpType === "shortKey" ? "text-emerald-500" : ""}`}
              >
                Short Key
              </label>
              <input type="text" placeholder="G" />
            </div>

            <div className="flex items-center mt-6">
              <button className="ml-auto mr-3" onClick={this.switchHelpVisible}>
                <HelpIcon />
              </button>
              <button className="py-2 px-6 text-sm font-semiboldml-auto select-none rounded-md bg-main-100 dark:bg-main-700 text-emerald-400 dark:text-emerald-500">
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
