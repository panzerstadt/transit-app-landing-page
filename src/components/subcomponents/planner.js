import React, { Component } from "react";
import Radium from "radium";
import ReactSVG from "react-svg";

import CircleIndicator from "./CircleIndicator";

import FlyInOutTab from "./FlyInOutTab";
import PlaceTab from "./PlaceTab";
import ChartTab from "./ChartTab";

import Hoverable from "./HoverableComponent";

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

const styles = {
  root: {
    width: 350,
    padding: 40,
    margin: "50px 0 50px 0",
    backgroundColor: "white",
    boxShadow: "0 0 20px #DCE9F2",
    color: "#2F4959",
    textShadow: "0 0 1px #DBDBDB"
    //border: "1px solid lightgrey"
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
    marginTop: -4,
    left: 22,
    height: 100,
    width: 2.2, // i dunno wth tab 1 loses .02 or thickness, so 2.2 is a workaround
    backgroundColor: "#6d6d6d",
    zIndex: 0
  },
  text: {
    "@media (min-width: 768px)": {
      marginLeft: 0
    }
  },
  circle: {
    zindex: 1,
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
    height: 30,
    filter: "drop-shadow(0 0 2px #dbdbdb)"
  }
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

const flightData = {
  flyIn: {
    arrival: "09:00AM",
    terminal: "2",
    gate: "40B"
  },
  flyOut: {
    departure: "01:00PM",
    terminal: "5",
    gate: "120F"
  }
};

class Planner extends Component {
  render() {
    /* takes inputs:
    list of objects indicating whether to use FlyInTab or PlaceTab or CheckInTab

    */

    // todo: given a list of inputs, generate all the appropriate components, and set keys dynamically

    return (
      <div style={styles.root}>
        <FlyInOutTab
          style={styles}
          cIndex="1"
          cColor="#6d6d6d"
          data={flightData.flyIn}
          onHoverData={{ arrival: "10:00AM" }}
        />

        <PlaceTab
          style={styles}
          cIndex="2"
          cColor="#6d6d6d"
          data={placeData.sushi}
          onHoverData={{ map: "map url here" }}
        />

        <PlaceTab
          style={styles}
          cIndex="3"
          cColor="#6d6d6d"
          data={placeData.ana}
          onHoverData={{ map: "map url here" }}
        />

        <ChartTab
          style={styles}
          cIndex="4"
          cColor="#ad003e"
          data={chartData.checkIn}
          onHoverData={{ map: "map url here" }}
        />

        <ChartTab
          style={styles}
          cIndex="5"
          cColor="#E20034"
          data={chartData.boarding}
        />

        <FlyInOutTab
          style={styles}
          cIndex="6"
          cColor="#ff003d"
          data={flightData.flyOut}
          onHoverData={{ departure: "03:00AM" }}
        />
      </div>
    );
  }
}
export default Radium(Planner);
