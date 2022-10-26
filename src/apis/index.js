import axios from "axios";
import { QWEATER_KEY } from "./KEY";

export function GetWeather(data) {
  return axios({
    methods: "GET",
    url: `https://devapi.qweather.com/v7/weather/now?location=${data.location}&key=${QWEATER_KEY}&lang=en`,
  });
}
