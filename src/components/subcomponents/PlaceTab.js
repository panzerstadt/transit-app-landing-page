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
      const tabStyle = {
        image: {
          width: 300
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
          <div style={{ ...style.line, height: 130 }} />
          <p>{data.title}</p>
          <img style={tabStyle.image} src={data.image} alt={data.title} />
          <div style={tabStyle.subsubTab}>{content}</div>
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
