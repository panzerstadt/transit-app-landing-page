import React, { Component } from "react";

import foodTab from "../../assets/planner/food-icon.svg";
import shopTab from "../../assets/planner/shop-icon.svg";

import CircleIndicator from "./CircleIndicator";

const style = {};

export default class PlaceTab extends Component {
  render() {
    const { data, cIndex, cColor, style } = this.props;

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
        title: {
          position: "absolute",
          margin: "0 auto",
          marginTop: 10,
          marginLeft: lineOffsetMargin,

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

          marginTop: 270,
          marginLeft: lineOffsetMargin
        },
        image: {
          position: "absolute",
          objectFit: "cover",
          marginTop: 50,
          marginLeft: lineOffsetMargin,
          height: 200,
          width: style.root.width - lineOffsetMargin
          // maxWidth: 400
        }
      };

      const content_data = [
        {
          header: "Price",
          body: "￥".repeat(parseInt(data.price))
        },
        {
          header: "Time",
          body: data.time
        }
      ];

      const content = content_data.map(d => {
        return (
          <div style={tabStyle.block}>
            <p style={tabStyle.header}>{d.header}</p>
            <p style={tabStyle.body}>{d.body}</p>
          </div>
        );
      });

      return (
        <div style={style.subTab}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              flexWrap: "wrap"
            }}
          >
            <div style={{ ...style.line, height: 380 }} />
            <p style={tabStyle.title}>{data.title}</p>
            <img style={tabStyle.image} src={data.image} alt={data.title} />
            <div style={tabStyle.subsubTab}>{content}</div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div style={style.mainTab}>
          <CircleIndicator text={cIndex} color={cColor} />
          <img style={style.whiteBox} src={dataType} alt="flyin" />
        </div>
        {placeTabComponent(data)}
      </div>
    );
  }
}
