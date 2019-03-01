import React, { useState } from "react";

import styles from "./BoardTab.module.css";

import Place from "../../assets/icons/planner/place.svg";
import BoardingChart from "../../assets/planner/boarding.svg";

const WalkTab = ({ cIndex, airport, time, status }) => {
  const [popup, setPopup] = useState(false);

  const handleClick = e => {
    const pos = e;
    console.log(pos);

    setPopup(!popup);

    //alert(`you clicked ${e.currentTarget.getAttribute("label")}!`);
  };
  return (
    <div
      id={`tab-${cIndex}`}
      className={styles.iphonePadding}
      style={{
        margin: "45px 0 90px 0",
        height: 388,
        //backgroundColor: "white",
        color: "white",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}
    >
      <h1
        style={{
          color: "#F50945",
          margin: 0,
          fontSize: 40,
          textShadow: "1px 2px 15px rgba(0, 0, 0, 0.162)"
        }}
      >
        Board
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          marginTop: 10
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 26, fontWeight: "bold" }}>
            {airport || "at Gate 40B"}
          </h3>
          <h4
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 500
            }}
          >
            {time || "4:00 PM"}
          </h4>
        </div>

        <button
          label="place"
          onClick={handleClick}
          style={{
            borderRadius: 8,
            height: 32,
            width: 32,
            backgroundColor: "#F50945",
            outline: "none",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={Place} alt="n" height={14} style={{ marginTop: 2 }} />
        </button>
        <div
          id="btn-bubble"
          style={{
            transition: "opacity 300ms ease",
            display: "block",
            opacity: popup ? 1 : 0,
            position: "absolute",
            right: 0,
            top: 0,
            marginTop: -40,
            marginRight: 5,
            textAlign: "right",
            fontSize: 12,
            fontWeight: 500
          }}
        >
          <span>
            easily get directions
            <br /> to your gate
          </span>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h6 style={{ margin: 0, fontSize: 12, fontWeight: 300 }}>Status</h6>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {status || "on time"}
        </span>
      </div>

      <div style={{ marginTop: 30 }}>
        <img src={BoardingChart} alt="boarding chart" />
      </div>
    </div>
  );
};

export default WalkTab;
