import React, { Component } from "react";
import Radium from "radium";
import ReactSVG from "react-svg";

import flyOutTab from "../../assets/planner/flight2-icon.svg";

import CircleIndicator from "./CircleIndicator";

import FlyInOutTab from "./FlyInOutTab";
import PlaceTab from "./PlaceTab";
import ChartTab from "./ChartTab";

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
    label: "Ariso Sushi",
    image: images["sushi.jpg"],
    price: "2",
    time: "09:30AM - 10:30AM"
  },
  ana: {
    type: "shop",
    label: "Ana Festa",
    image: images["ana.jpg"],
    price: "1",
    time: "10:45AM - 11:15AM"
  }
};

const chartData = {
  checkIn: {
    type: "check-in",
    label: "Ana Airline",
    chartData: [
      {
        time: 11,
        amount: 2
      },
      {
        time: 12,
        amount: 5
      },
      {
        time: 13,
        amount: 9
      },
      {
        time: 14,
        amount: 6
      },
      {
        time: 15,
        amount: 2
      },
      {
        time: 16,
        amount: 1
      }
    ],
    chartLabel: "Queue times"
  },
  boarding: {
    type: "boarding",
    tabData: [
      {
        header: "Gate Open",
        body: "12:30PM"
      },
      {
        header: "Terminal",
        body: "2"
      },
      {
        header: "Gate",
        body: "40B"
      }
    ],
    chartData: [
      {
        time: 11,
        amount: 9
      },
      {
        time: 12,
        amount: 7
      },
      {
        time: 13,
        amount: 5
      },
      {
        time: 14,
        amount: 3
      },
      {
        time: 15,
        amount: 7
      },
      {
        time: 16,
        amount: 4
      }
    ],
    chartLabel: "Queue times"
  }
};

class Planner extends Component {
  render() {
    /* takes inputs:
    list of objects indicating whether to use FlyInTab or PlaceTab or CheckInTab

    */
    return (
      <div style={styles.root}>
        <FlyInOutTab
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

        <ChartTab
          style={styles}
          cIndex="4"
          cColor="#ad003e"
          data={chartData.checkIn}
        />

        <ChartTab
          style={styles}
          cIndex="5"
          cColor="#E20034"
          data={chartData.boarding}
        />

        <FlyInOutTab
          style={styles}
          departure="01:00PM"
          terminal="5"
          gate="120F"
          cIndex="6"
          cColor="#ff003d"
        />
      </div>
    );
  }
}
export default Radium(Planner);
