import React, { Component } from "react";
import Radium from "radium";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import moment from "moment";

import Hoverable from "./HoverableComponent";

import checkInTab from "../../assets/planner/checkin-icon.svg";
import boardingTab from "../../assets/planner/boarding-icon.svg";

import CircleIndicator from "./CircleIndicator";

// settings
let tabHeight = 280;
class ChartTab extends Component {
  render() {
    const { data, cIndex, cColor, style, focused, onHoverData } = this.props;
    const time = moment().format("HH");

    console.debug(focused);
    console.debug(onHoverData);

    // should this be responsive????
    const lineOffsetMargin = 68;
    const tabStyle = {
      label: {
        position: "absolute",
        marginTop: 10,
        marginLeft: lineOffsetMargin,
        marginRight: 0,
        marginBottom: 0,

        fontSize: 25,
        fontWeight: 100,
        width: 200
      },
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
        position: "absolute",
        display: "flex",

        width: style.root.width - lineOffsetMargin,
        textAlign: "left",
        justifyContent: "space-between",
        alignItems: "start",

        marginTop: 20,
        marginLeft: lineOffsetMargin
      },
      chart: {
        position: "absolute",
        objectFit: "cover",
        marginTop: 60,
        marginLeft: lineOffsetMargin - 20,
        height: 200,
        width: style.root.width - lineOffsetMargin
        // maxWidth: 400
      }
    };

    let dataType;
    if (data.type === "check-in") {
      dataType = checkInTab;
    } else if (data.type === "boarding") {
      dataType = boardingTab;
    } else {
      dataType = checkInTab;
    }

    const chartTabComponent = data => {
      const topComponent = () => {
        if (data.type === "check-in") {
          return <p style={tabStyle.label}>{data.label}</p>;
        } else {
          // return tabs
          const content = data.tabData.map((d, i) => {
            return (
              <div key={i} style={tabStyle.block}>
                <p style={tabStyle.header}>{d.header}</p>
                <p style={tabStyle.body}>{d.body}</p>
              </div>
            );
          });
          return <div style={tabStyle.subsubTab}>{content}</div>;
        }
      };

      let chartStyle =
        data.type === "check-in"
          ? { ...tabStyle.chart, marginTop: 30 }
          : tabStyle.chart;

      return (
        <div
          style={{
            ...style.subTab,
            ":hover": {
              backgroundColor: "red"
            }
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              flexWrap: "wrap"
            }}
          >
            <div style={{ ...style.line, height: tabHeight }} />
            {topComponent()}
            <div style={chartStyle}>
              <VictoryChart theme={VictoryTheme.material} height={250}>
                <VictoryAxis
                  standalone={false}
                  style={{
                    axis: { stroke: "transparent" },
                    grid: { stroke: "transparent" },
                    axisLabel: { fontSize: 30, padding: 30 }
                  }}
                />
                <VictoryBar
                  barWidth={40}
                  data={data.chartData}
                  x="time"
                  y="amount"
                  alignment="start"
                  style={{
                    data: {
                      fill: d => (d.time === time ? "#ff003d" : "#ad003e")
                    }
                  }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div id={`tab-${cIndex}`}>
        <div style={style.mainTab}>
          <CircleIndicator text={cIndex} color={cColor} />
          <img style={style.whiteBox} src={dataType} alt="flyin" />
        </div>
        {chartTabComponent(data)}
      </div>
    );
  }
}
export default Hoverable(Radium(ChartTab));
