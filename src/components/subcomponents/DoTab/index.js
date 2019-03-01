import React, { useState, useEffect } from "react";

import "leaflet/dist/leaflet.css";
import styles from "./index.module.css";

import Map from "./Map";
import Carousel from "./Carousel";

import Place from "../../../assets/icons/planner/place.svg";

const position = [35.551915, 139.7884827];

const DoTab = ({ cIndex, cardData, terminal, time }) => {
  const [pos, setPos] = useState(position);
  const [selected, setSelected] = useState("");

  const handleClick = e => {
    if (e.currentTarget.getAttribute("label")) {
      alert(`you clicked ${e.currentTarget.getAttribute("label")}!`);
    } else {
      console.log(e.currentTarget);
    }
  };

  const handleChange = data => {
    console.log(data);
    setPos(data.position);
  };

  return (
    <div
      id={`tab-${cIndex}`}
      style={{
        position: "relative",
        margin: "45px 0 90px 0",
        height: 550,
        //backgroundColor: "white",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}
    >
      <h1
        className={styles.iphonePadding}
        style={{
          color: "#F50945",
          margin: 0,
          fontSize: 40
        }}
      >
        Do
      </h1>

      <div
        className={styles.iphonePadding}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 10
        }}
      >
        <div>
          <h6 style={{ margin: "0 100px 0 0", fontSize: 12, fontWeight: 300 }}>
            Terminal
          </h6>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {terminal || "2"}
          </span>
        </div>
        <div>
          <h6 style={{ margin: 0, fontSize: 12, fontWeight: 300 }}>
            Transit period
          </h6>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {time || "5 hours"}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 20, height: 420, zIndex: 1 }}>
        <Map position={pos} />
      </div>

      <Carousel onClick={handleClick} onChange={handleChange} />
    </div>
  );
};

export default DoTab;
