import React, { Component } from "react";
import Radium from "radium";
import ReactSVG from "react-svg";

import flyOutTab from "../../assets/planner/flight2-icon.svg";
import checkInTab from "../../assets/planner/checkin-icon.svg";
import boardingTab from "../../assets/planner/boarding-icon.svg";
import foodTab from "../../assets/planner/food-icon.svg";
import shopTab from "../../assets/planner/shop-icon.svg";

import CircleIndicator from "./CircleIndicator";

import FlyInTab from "./FlyInTab";
import PlaceTab from "./PlaceTab";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
    return null;
  });
  //console.log(images);
  return images;
}

// prepare bg images
let images = importAll(
  require.context("../../assets/planner/", true, /.*\.jpg$/)
);

console.log(images);

const styles = {
  root: {
    width: 350,
    padding: 30,
    margin: "50px 0 50px 0",
    //backgroundColor: "#00000010"
    border: "1px solid lightgrey"
  },
  flex: {
    position: "relative"
  },
  mainTab: {
    display: "flex",
    width: "100%",
    textAlign: "left",
    justifyContent: "start",
    alignItems: "center"
  },
  subTab: {
    display: "flex",
    width: "100%",
    textAlign: "left",
    justifyContent: "space-between",
    alignItems: "center"
  },
  line: {
    position: "relative",
    marginTop: -10,
    left: 22,
    height: 100,
    width: 2,
    backgroundColor: "#6d6d6d",
    zIndex: -1
  },
  text: {
    "@media (min-width: 768px)": {
      marginLeft: 0
    }
  },
  circle: {
    width: 45,
    paddingRight: 20,
    text: {
      position: "absolute",
      margin: "0 auto",
      paddingTop: 12,
      paddingLeft: 18,
      color: "white",
      fontWeight: 400,
      fontFamily: "Roboto, sans-serif"
    }
  },
  whiteBox: {
    height: 30
  }
};

const CircleComponent = (text, clr, style) => {
  let circ = (
    <div style={style.circle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.663 36">
        <ellipse
          id="Ellipse_3"
          data-name="Ellipse 3"
          fill={clr}
          cx="18.831"
          cy="18"
          rx="18.831"
          ry="18"
        />
      </svg>
    </div>
  );

  return (
    <div>
      <p style={style.circle.text}>{text}</p>
      {circ}
    </div>
  );
};

const placeData = {
  sushi: {
    type: "food",
    title: "Ariso Sushi",
    image: images["sushi.jpg"],
    price: "2",
    time: "09:30AM - 10:30AM"
  },
  ana: {
    type: "shop",
    title: "Ana Festa",
    image: images["ana.jpg"],
    price: "1",
    time: "10:45AM - 11:15AM"
  }
};

class Planner extends Component {
  render() {
    /* takes inputs:
    list of objects indicating whether to use FlyInTab or PlaceTab or CheckInTab

    */
    return (
      <div style={styles.root}>
        <FlyInTab
          style={styles}
          arrival="09:00AM"
          terminal="2"
          gate="40B"
          cIndex="1"
          cColor="#6d6d6d"
        />

        <PlaceTab
          style={styles}
          cIndex="2"
          cColor="#6d6d6d"
          data={placeData.sushi}
        />

        <PlaceTab
          style={styles}
          cIndex="3"
          cColor="#6d6d6d"
          data={placeData.ana}
        />

        <div style={styles.mainTab}>
          {CircleComponent("4", "#ad003e", styles)}
          <img style={styles.whiteBox} src={checkInTab} alt="flyin" />
        </div>

        <div style={styles.line} />

        <div style={styles.mainTab}>
          {CircleComponent("5", "#DB0033", styles)}
          <img style={styles.whiteBox} src={boardingTab} alt="flyin" />
        </div>

        <div style={styles.line} />

        <div style={styles.mainTab}>
          {CircleComponent("6", "#ff003d", styles)}
          <img style={styles.whiteBox} src={flyOutTab} alt="flyin" />
        </div>

        <div style={styles.line} />
      </div>
    );
  }
}
export default Radium(Planner);
