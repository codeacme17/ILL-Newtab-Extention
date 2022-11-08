import React, { Component } from "react";

import ArrowupIcon from "../../../icons/arrowup";
import LoadingIcon from "../../../icons/loading";
import { GetWeather } from "../../../apis";

export default class Weather extends Component {
  getLocalData = () => {
    this.localData = JSON.parse(localStorage.getItem("_setting_data"));
  };

  setLocalData = () => {
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  state = {
    detailVisible: false,
    /**
     *  @state requestState: The state of request QWeather's API;
     *
     *  @value "0" - component loading (default)
     *  @value "1" - http request success
     *  @value "2" - http request error
     *  @value "3" - browser position error
     */
    requestState: "0",
    errorMessage: "",
    weatherData: {},
  };

  componentDidMount = async () => {
    // Get state of weather item from local storage
    this.getLocalData();
    this.setState({ detailVisible: this.localData.weather.open });

    // Request QWeather's API to get the weather data
    if (true || process.env.NODE_ENV !== "development") {
      this.getWeatherData();
    }
  };

  // Get the current position of the user
  getPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const that = this;
    return new Promise((resolve, reject) => {
      function success(pos) {
        let position = `${pos.coords.longitude.toFixed(2)},${pos.coords.latitude.toFixed(2)}`;
        resolve(position);
      }
      function error(err) {
        that.setState({ requestState: "3", errorMessage: err.message });
        reject(err);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  };

  // Access qweather api
  getWeatherData = async () => {
    const location = await this.getPosition();
    let res = await GetWeather({
      location,
    });
    if (res.data.code !== "200") {
      this.setState({ requestState: "2" });
      return;
    }
    this.setState({ requestState: "1", weatherData: res.data.now });
  };

  // Switch detail content visible handler
  switchDetailVisible = () => {
    this.getLocalData();
    this.localData.weather.open = !this.state.detailVisible;
    this.setState({ detailVisible: !this.state.detailVisible });
    this.setLocalData();
  };

  render() {
    const { detailVisible, requestState, weatherData, errorMessage } = this.state;

    return (
      <section className="silder-item">
        {/* Header */}
        <div className="header drag-handle">
          {requestState === "0" ? (
            <div className="animate-pulse py-1">GETTING WEATHER DATA ...</div>
          ) : (
            ""
          )}

          {requestState === "1" ? (
            <div>
              <i className={`qi-${weatherData.icon} text-lg mr-3`}></i>
              <span>{weatherData.temp} ℃</span>
              <span className="ml-3">{weatherData.text}</span>
            </div>
          ) : (
            ""
          )}

          <div className="py-1 pl-1 text-rose-600 dark:text-rose-500 font-normal italic">
            {requestState === "2" ? "Request Error !" : ""}
            {requestState === "3" ? `${errorMessage}` : ""}
          </div>

          <button
            className={`draw-btn ${detailVisible ? "rotate-0" : "rotate-180"}`}
            onClick={this.switchDetailVisible}
            disabled={requestState === "2" || requestState === "3"}
          >
            <ArrowupIcon />
          </button>
        </div>

        {/* Content */}
        <div
          className={`content text-sm ${
            detailVisible && requestState !== "2" && requestState !== "3"
              ? "h-32 p-3 opacity-100"
              : "h-0 p-0 opacity-0"
          }`}
        >
          {requestState === "0" ? (
            <div className="flex h-full justify-center items-center">
              <LoadingIcon />
            </div>
          ) : (
            ""
          )}

          {requestState === "1" ? (
            <div>
              {" "}
              <div className="mb-2">
                Sensible Temperature :{" "}
                <span className="font-bold ml-1">{weatherData.feelsLike} ℃</span>
              </div>
              <div className="mb-2">
                Rainfall : <span className="font-bold ml-1">{weatherData.precip}</span>
              </div>
              <div className="mb-2">
                Wind Direction : <span className="font-bold ml-1">{weatherData.windDir}</span>
              </div>
              <div className="">
                Wind Scale : <span className="font-bold ml-1">{weatherData.windScale}</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  }
}
