import React, { Component } from "react";
import ArrowupIcon from "../../../icons/arrowup";
import LoadingIcon from "../../../icons/loading";
import { GetWeather } from "../../../apis";

export default class Weather extends Component {
  state = {
    detailVisible: false,
    // requestState: The state of request QWeather's API;
    // "0" - loading (default)
    // "1" - request success
    // "2" - request error
    // "3" - browser not allow user access current position
    requestState: "0",
    weatherData: {},
  };

  componentDidMount = async () => {
    // Get state of weather item from local storage
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    this.setState({ detailVisible: localData.weather.open });

    // Request QWeather's API to get the weather data

    // const location = await this.getLocation();
    // const res = await GetWeather({
    //   location,
    // });
    // if (res.data.code !== "200") {
    //   this.setState({ requestState: "2" });
    //   return;
    // }
    // this.setState({ requestState: "1" });

    const res = {
      data: {
        now: {
          temp: "17",
          feelsLike: "14",
          icon: "101",
          text: "Cloudy",
          windDir: "SE",
          windScale: "4",
          windSpeed: "20",
          precip: "0.0",
          pressure: "1019",
          vis: "30",
          cloud: "100",
          dew: "10",
        },
      },
    };
    this.setState({ weatherData: res.data.now });
  };

  // Get the current location of the user
  getLocation = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      let position;
      function success(pos) {
        position = `${pos.coords.longitude.toFixed(2)},${pos.coords.latitude.toFixed(2)}`;
        resolve(position);
      }
      function error(err) {
        that.setState({ requestState: "3" });
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  };

  // Switch detail content visible handler
  switchDetailVisible = () => {
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    if (this.state.detailVisible) {
      this.setState({ detailVisible: false });
      localData.weather.open = false;
    } else {
      this.setState({ detailVisible: true });
      localData.weather.open = true;
    }
    localStorage.setItem("_setting_data", JSON.stringify(localData));
  };

  render() {
    const { detailVisible, requestState, weatherData } = this.state;

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
            {requestState === "3" ? "Please allow page for positioning !" : ""}
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
