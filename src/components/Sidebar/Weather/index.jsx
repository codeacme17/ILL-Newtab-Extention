import React, { Component } from "react";
import ArrowupIcon from "../../../icons/arrowup";
import { GetWeather } from "../../../apis";

export default class Weather extends Component {
  state = {
    detailVisible: true,
    weatherData: {},
  };

  componentDidMount = async () => {
    // const location = await this.getLocation();
    // const res = await GetWeather({
    //   location,
    // });
    // if (res.data.code !== "200") return;
    const res = {
      data: {
        now: {
          obsTime: "2022-10-26T12:26+08:00",
          temp: "17",
          feelsLike: "14",
          icon: "101",
          text: "Cloudy",
          wind360: "135",
          windDir: "SE",
          windScale: "4",
          windSpeed: "20",
          humidity: "60",
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

  getLocation = () => {
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
        reject(new Error(err.message));
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  };

  // Switch detail content visible handler
  switchDetailVisible = () => {
    if (this.state.detailVisible) this.setState({ detailVisible: false });
    else this.setState({ detailVisible: true });
  };

  render() {
    const { detailVisible, weatherData } = this.state;

    return (
      <section className="silder-item">
        {/* Header */}
        <div className="header drag-handle">
          <div>
            <i className={`qi-${weatherData.icon} text-lg mr-3`}></i>
            <span>{weatherData.temp} ℃</span>
            <span className="ml-3">{weatherData.text}</span>
          </div>
          <button
            className={`draw-btn ${detailVisible ? "rotate-0" : "rotate-180"}`}
            onClick={this.switchDetailVisible}
          >
            <ArrowupIcon />
          </button>
        </div>

        {/* Content */}
        <div
          className={`content text-sm ${
            detailVisible ? "h-32 p-3 opacity-100" : "h-0 p-0 opacity-0"
          }`}
        >
          <div className="mb-2">
            Sensible Temperature : <span className="font-bold ml-1">{weatherData.feelsLike} ℃</span>
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
      </section>
    );
  }
}
