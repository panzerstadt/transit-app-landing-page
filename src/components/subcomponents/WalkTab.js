import React from "react";

import Place from "../../assets/icons/planner/place.svg";

const WalkTab = ({ cIndex, text, distance, mins }) => {
  const handleClick = e => {
    alert(`you clicked ${e.currentTarget.getAttribute("label")}!`);
  };
  return (
    <div
      id={`tab-${cIndex}`}
      style={{
        margin: "45px 0 90px 0",
        height: 113,
        //backgroundColor: "white",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}
    >
      <h1 style={{ color: "#F50945", margin: 0, fontSize: 40 }}>Walk</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 26, fontWeight: "bold" }}>
            {text || "to Terminal 2"}
          </h3>
          <h4
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 500
            }}
          >
            {mins || distance || "10 mins"}
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
            border: "none"
          }}
        >
          <img src={Place} alt="n" height={14} style={{ marginTop: 2 }} />
        </button>
      </div>
    </div>
  );
};

export default WalkTab;
