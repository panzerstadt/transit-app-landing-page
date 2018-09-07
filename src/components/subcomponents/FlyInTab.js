import React, { Component } from "react";

import flyInTab from "../../assets/planner/flight-icon.svg";

import CircleIndicator from "./CircleIndicator";

export default class FlyIn extends Component {
  render() {
    const { arrival, terminal, gate, style, cIndex, cColor } = this.props;

    const flyInTabContent = (arrival, terminal, gate) => {
      // should this be responsive????
      const lineOffsetMargin = 68;

      const data = [
        {
          header: "Scheduled Arrival",
          body: arrival
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
          marginLeft: 0
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

      const content = data.map(d => {
        return (
          <div style={tabStyle.block}>
            <p style={tabStyle.header}>{d.header}</p>
            <p style={tabStyle.body}>{d.body}</p>
          </div>
        );
      });

      return (
        <div style={style.subTab}>
          <div style={{ ...style.line, height: 130 }} />
          <div style={tabStyle.subsubTab}>{content}</div>
        </div>
      );
    };

    return (
      <div>
        <div style={style.mainTab}>
          <CircleIndicator text={cIndex} color={cColor} />
          <img style={style.whiteBox} src={flyInTab} alt="flyin" />
        </div>
        {flyInTabContent(arrival, terminal, gate)}
      </div>
    );
  }
}
