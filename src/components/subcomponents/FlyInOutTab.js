import React, { Component } from "react";
import Radium from "radium";

import Hoverable from "./HoverableComponent";

import flyInTab from "../../assets/planner/flight-icon.svg";
import flyOutTab from "../../assets/planner/flight2-icon.svg";

import CircleIndicator from "./CircleIndicator";
import AddAlert from "../../assets/icons/planner/add-alert.svg";

// settings
const tabHeight = 150;
class OLDFlyInOut extends Component {
  render() {
    const {
      data,
      style,
      cIndex,
      cColor,
      onHoverData,
      isHovered,
      focused
    } = this.props;
    const { arrival, departure, terminal, gate } = data;

    // optional interactivity on hover
    // console.log("is hovered", isHovered);
    // console.log("is focused", focused);
    // console.log(onHoverData);
    if (isHovered) {
      //do something
      console.log("hover state", isHovered, focused);
      // change the arrival timing animation together with flight numbers
    }

    const flyInOutTabContent = (arrival, terminal, gate) => {
      // should this be responsive????
      const lineOffsetMargin = 68;

      let viewTiming = () => {
        if (arrival) {
          if (isHovered) {
            return onHoverData.arrival;
          }
          return arrival;
        } else {
          if (isHovered) {
            return onHoverData.departure;
          }
          return departure;
        }
      };

      const data = [
        {
          header: arrival ? "Scheduled Arrival" : "Scheduled Departure",
          body: viewTiming()
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
            //backgroundColor: "red"
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
          paddingBottom: 30
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
          {arrival ? (
            <div style={{ ...style.line, height: tabHeight }} />
          ) : (
            <div
              style={{
                ...style.line,
                height: tabHeight,
                backgroundColor: "transparent"
              }}
            />
          )}
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

class FlyInOut extends Component {
  state = {
    popup: false
  };
  handleClick = this.handleClick.bind(this);

  handleClick(e) {
    this.setState({ popup: !this.state.popup });
    //alert(`you clicked ${e.currentTarget.getAttribute("label")}!`);
  }

  render() {
    const {
      data,
      style,
      cIndex,
      cColor,
      onHoverData,
      isHovered,
      focused
    } = this.props;
    const { arrival, departure, terminal, gate } = data;

    const schedule = arrival || departure;
    const status = data.status || false;
    const airport = data.airport;

    // optional interactivity on hover
    // console.log("is hovered", isHovered);
    // console.log("is focused", focused);
    // console.log(onHoverData);
    if (isHovered) {
      //do something
      //console.log("hover state", isHovered, focused);
      // change the arrival timing animation together with flight numbers
    }

    const flyInOutTabContent = (arrival, terminal, gate) => {
      // should this be responsive????
      const lineOffsetMargin = 68;

      let viewTiming = () => {
        if (arrival) {
          if (isHovered) {
            return onHoverData.arrival;
          }
          return arrival;
        } else {
          if (isHovered) {
            return onHoverData.departure;
          }
          return departure;
        }
      };

      const data = [
        {
          header: arrival ? "Scheduled Arrival" : "Scheduled Departure",
          body: viewTiming()
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
            //backgroundColor: "red"
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
          paddingBottom: 30
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
          {arrival ? (
            <div style={{ ...style.line, height: tabHeight }} />
          ) : (
            <div
              style={{
                ...style.line,
                height: tabHeight,
                backgroundColor: "transparent"
              }}
            />
          )}
          <div style={tabStyle.subsubTab}>{content}</div>
        </div>
      );
    };

    const styles = {
      root: {
        "@media (min-width: 320px)": {
          padding: "0 28px"
        }
      }
    };

    return (
      <div
        id={`tab-${cIndex}`}
        className={styles.root}
        style={{
          margin: "45px 0 90px 0",
          height: 258,
          //backgroundColor: "white",
          color: arrival ? "black" : "white",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",

          // iphone 5 settings
          padding: "0 20px",
          "@media (min-width: 330px)": {
            padding: 0
          }
        }}
      >
        <h1 style={{ color: "#F50945", margin: 0, fontSize: 40 }}>
          {arrival ? "Arrive" : "Depart"}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            position: "relative"
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 26, fontWeight: "bold" }}>
              {airport || "Changi Airport"}
            </h3>
            <h4
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 500
              }}
            >
              Wed, 14 May
            </h4>
          </div>

          <button
            label="alert"
            onClick={this.handleClick}
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
            <img src={AddAlert} alt="n" height={14} style={{ marginTop: 2 }} />
          </button>
          <div
            id="btn-bubble"
            style={{
              transition: "opacity 300ms ease",
              display: "block",
              opacity: this.state.popup ? 1 : 0,
              position: "absolute",
              right: 0,
              top: 0,
              marginTop: -40,
              marginRight: 5,
              textAlign: "right",
              fontSize: 12,
              fontWeight: 600
            }}
          >
            <span>
              be notified of any
              <br />
              changes to your flight
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30
          }}
        >
          <div>
            <h6 style={{ margin: 0, fontSize: 12, fontWeight: 300 }}>
              Schedule
            </h6>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
              {schedule || "XX:XX AM"}
            </span>
          </div>
          <div>
            <h6 style={{ margin: 0, fontSize: 12, fontWeight: 300 }}>
              Terminal
            </h6>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
              {terminal || "3"}
            </span>
          </div>
          <div>
            <h6 style={{ margin: "0 45px 0 0", fontSize: 12, fontWeight: 300 }}>
              Gate
            </h6>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
              {gate || "F37"}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          <h6 style={{ margin: 0, fontSize: 12, fontWeight: 300 }}>Status</h6>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {status || "on time"}
          </span>
        </div>
      </div>
    );

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
