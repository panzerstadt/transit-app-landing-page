import React, { Component } from "react";
import Radium from "radium";

import Hoverable from "./HoverableComponent";

import foodTab from "../../assets/planner/food-icon.svg";
import shopTab from "../../assets/planner/shop-icon.svg";

import CircleIndicator from "./CircleIndicator";

// settings
const tabHeight = 360;

class PlaceTab extends Component {
  render() {
    const { data, cIndex, cColor, style, focused, onHoverData } = this.props;

    console.debug("hover data for place tab");
    console.debug(onHoverData);

    let dataType;
    if (data.type === "food") {
      dataType = foodTab;
    } else if (data.type === "shop") {
      dataType = shopTab;
    } else {
      dataType = shopTab;
    }

    const placeTabComponent = data => {
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
          fontSize: 18,
          fontWeight: 100
        },
        subsubTab: {
          position: "absolute",
          display: "flex",

          width: style.root.width - lineOffsetMargin,
          textAlign: "left",
          justifyContent: "space-between",
          alignItems: "start",

          marginTop: 270,
          marginLeft: lineOffsetMargin
        },
        image: {
          transition: "all 1000ms ease 300ms",
          position: "absolute",
          objectFit: "cover",
          marginTop: 50,
          marginLeft: lineOffsetMargin,
          height: 200,
          width: style.root.width - lineOffsetMargin
          // maxWidth: 400
        }
      };

      const focusAnimationStyle = {
        img: {
          inFocus: {
            boxShadow: "0 5px 40px #698299"
          },
          outFocus: {
            boxShadow: "0 0 0 transparent"
          }
        }
      };

      const focusAnimation = tag => {
        if (focused) {
          return focusAnimationStyle[tag].inFocus;
        } else {
          return focusAnimationStyle[tag].outFocus;
        }
      };

      const content_data = [
        {
          header: "Price",
          body: "￥".repeat(parseInt(data.price, 10))
        },
        {
          header: "Time",
          body: data.time
        }
      ];

      const content = content_data.map((d, i) => {
        return (
          <div key={i} style={tabStyle.block}>
            <p style={tabStyle.header}>{d.header}</p>
            <p style={tabStyle.body}>{d.body}</p>
          </div>
        );
      });

      return (
        <div
          style={{
            ...style.subTab,
            ":hover": {
              //backgroundColor: "red"
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
            <p style={tabStyle.label}>{data.label}</p>
            <img
              style={{ ...tabStyle.image, ...focusAnimation("img") }}
              src={data.image}
              alt={data.label}
            />
            <div style={tabStyle.subsubTab}>{content}</div>
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
        {placeTabComponent(data)}
      </div>
    );
  }
}
export default Hoverable(Radium(PlaceTab));
