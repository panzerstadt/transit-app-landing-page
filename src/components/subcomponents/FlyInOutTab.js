import React, { Component } from "react";
import Radium from "radium";

import Hoverable from "./HoverableComponent";

import flyInTab from "../../assets/planner/flight-icon.svg";
import flyOutTab from "../../assets/planner/flight2-icon.svg";

import CircleIndicator from "./CircleIndicator";

class FlyInOut extends Component {
  render() {
    const { data, style, cIndex, cColor, onHoverData, isHovered } = this.props;
    const { arrival, departure, terminal, gate } = data;

    // optional interactivity on hover
    console.log("is hovered", isHovered);
    console.log(onHoverData);
    if (isHovered) {
      //do something
      console.log("hover state");
      // change the arrival timing animation together with flight numbers
    }

    const flyInOutTabContent = (arrival, terminal, gate) => {
      // should this be responsive????
      const lineOffsetMargin = 68;

      const data = [
        {
          header: arrival ? "Scheduled Arrival" : "Scheduled Departure",
          body: arrival ? arrival : departure
        },
        {
          header: "Terminal",
          body: terminal
        },
        {
          header: "Gate",
          body: gate
        }
      ];

      const tabStyle = {
        block: {
          marginLeft: 0,
          ":hover": {
            backgroundColor: "red"
          }
        },
        header: {
          margin: "0 auto",
          fontSize: 11,
          fontWeight: 100,
          paddingBottom: 10
        },
        body: {
          margin: "0 auto",
          fontSize: 23,
          fontWeight: 100
        },
        subsubTab: {
          display: "flex",
          width: style.root.width - lineOffsetMargin,
          textAlign: "left",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: lineOffsetMargin,
          paddingTop: 20,
          paddingBottom: 50
        }
      };

      const content = data.map((d, i) => {
        return (
          <div key={i} style={tabStyle.block}>
            <p style={tabStyle.header}>{d.header}</p>
            <p style={tabStyle.body}>{d.body}</p>
          </div>
        );
      });

      return (
        <div style={style.subTab}>
          {arrival ? <div style={{ ...style.line, height: 130 }} /> : null}
          <div style={tabStyle.subsubTab}>{content}</div>
        </div>
      );
    };

    return (
      <div id={`tab-${cIndex}`}>
        <div style={style.mainTab}>
          <CircleIndicator text={cIndex} color={cColor} />
          <img
            style={style.whiteBox}
            src={arrival ? flyInTab : flyOutTab}
            alt="flyin"
          />
        </div>
        {flyInOutTabContent(arrival, terminal, gate)}
      </div>
    );
  }
}

export default Hoverable(Radium(FlyInOut));
