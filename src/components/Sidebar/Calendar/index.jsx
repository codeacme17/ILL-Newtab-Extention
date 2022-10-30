import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";

import ArrowupIcon from "../../../icons/arrowup";
import "./index.scss";

let localData;

function getLocalData() {
  localData = JSON.parse(localStorage.getItem("_setting_data"));
}

function setLocalData() {
  localStorage.setItem("_setting_data", JSON.stringify(localData));
}

// Get the currrent date to mounte in header
function getHeaderDate() {
  const d = new Date();
  return `${d.toDateString()}`;
}

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [detailVisible, setDetailVisible] = useState(Boolean);

  useEffect(() => {
    getLocalData();
    setDetailVisible(localData.calendar.open);
  });

  // Switch detail content visible handler
  const switchDetailVisible = () => {
    if (detailVisible) setDetailVisible(false);
    else setDetailVisible(true);
    localData.calendar.open = !detailVisible;
    setLocalData();
  };

  return (
    <section className="silder-item">
      <div className="header drag-handle">
        {getHeaderDate()}
        <button
          className={`draw-btn ${detailVisible ? "rotate-0" : "rotate-180"}`}
          onClick={switchDetailVisible}
        >
          <ArrowupIcon />
        </button>
      </div>

      <div className={`content ${detailVisible ? "h-60 p-3" : "h-0 p-0"}`}>
        <div>
          <ReactCalendar onChange={setDate} value={date} />
        </div>
      </div>
    </section>
  );
}
