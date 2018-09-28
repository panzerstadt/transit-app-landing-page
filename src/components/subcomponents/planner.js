import React, { Component } from "react";
import Radium from "radium";
//import ReactSVG from "react-svg";

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

let sY = 0;
let refOffsetY = [];
let buffer = 300;

// all variables
const styles = {
  root: {
    width: 290,
    // only for iphone 5
    padding: "30px 20px 30px 10px",
    "@media (min-width: 340px)": {
      // for the rest of the devices
      width: 300
      //padding: 30
    },
    boxShadow: "0 0 20px white",
    "@media (min-width: 420px)": {
      boxShadow: "0 0 20px #DCE9F2",
      padding: 30
    },
    margin: "50px 0 50px 0",
    backgroundColor: "white",
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
    justifyContent: "flex-start",
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

const onHoverData = {
  arrival: "10:00AM",
  departure: "03:00AM"
};

class Planner extends Component {
  constructor() {
    super();
    this.state = {
      focused: 0
    };
    this.refLocation = [1, 2, 3, 4, 5, 6].map(() => {
      return React.createRef();
    });
  }

  componentDidMount() {
    // listen to scroll
    window.addEventListener("scroll", this.handleScroll);
    // set the locations of all reference tabs
    refOffsetY = this.refLocation.map(r => {
      return r.current.offsetTop;
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    sY = window.scrollY + buffer;

    // if scroll pixels match object pixels, do something
    // define a buffer number of pixels to calculate distance from top of scroll

    // or a smarter one where you measure distance to an invisible line in the middle
    // the closet number gets focused, the rest get faded
    // also all the side logic happens here (text, map)

    // sorry man i'll refactor this in the future... >_<
    if (sY < refOffsetY[0]) {
      if (this.state.focused !== 0) {
        this.setState({ focused: 0 });
        this.onFocusChange();
      }
      //console.log("first tab hasn't disappeared above yet", sY, refOffsetY[0]);
    } else if (refOffsetY[5] < sY) {
      if (this.state.focused !== 6) {
        this.setState({ focused: 6 });
        this.onFocusChange();
      }

      //console.log("cutting 6th tab!");
    } else if (refOffsetY[4] < sY && sY < refOffsetY[5]) {
      if (this.state.focused !== 5) {
        this.setState({ focused: 5 });
        this.onFocusChange();
      }

      //console.log("cutting 5th tab!");
    } else if (refOffsetY[3] < sY && sY < refOffsetY[4]) {
      if (this.state.focused !== 4) {
        this.setState({ focused: 4 });
        this.onFocusChange();
      }

      //console.log("cutting 4th tab!");
    } else if (refOffsetY[2] < sY && sY < refOffsetY[3]) {
      if (this.state.focused !== 3) {
        this.setState({ focused: 3 });
        this.onFocusChange();
      }

      console.log("cutting 3rd tab!");
    } else if (refOffsetY[1] < sY && sY < refOffsetY[2]) {
      if (this.state.focused !== 2) {
        this.setState({ focused: 2 });
        this.onFocusChange();
      }

      //console.log("cutting 2nd tab!");
    } else if (refOffsetY[0] < sY && sY < refOffsetY[1]) {
      if (this.state.focused !== 1) {
        this.setState({ focused: 1 });
        this.onFocusChange();
      }

      //console.log("cutting 1st tab!");
    }

    // // this is the current scroll position
    // console.log(sY);
    // // this is the current ref per tab
    // console.log(refOffsetY);
  };

  onFocusChange() {
    let val = this.state.focused;
    this.props.onFocusChange(val);
  }

  render() {
    const { style } = this.props;
    //console.log(refOffsetY);
    // look for focused element here

    /* takes inputs:
    list of objects indicating whether to use FlyInTab or PlaceTab or CheckInTab

    */

    // todo: given a list of inputs, generate all the appropriate components, and set keys dynamically

    return (
      <div style={{ ...styles.root, ...style }} id="whereisit">
        <div ref={this.refLocation[0]} />
        <FlyInOutTab
          style={styles}
          cIndex="1"
          cColor="#6d6d6d"
          data={flightData.flyIn}
          onHoverData={onHoverData}
          focused={this.state.focused === 1}
        />

        <div ref={this.refLocation[1]} />
        <PlaceTab
          style={styles}
          cIndex="2"
          cColor="#6d6d6d"
          data={placeData.sushi}
          onHoverData={{ map: "map url here" }}
          focused={this.state.focused === 2}
        />

        <div ref={this.refLocation[2]} />
        <PlaceTab
          style={styles}
          cIndex="3"
          cColor="#6d6d6d"
          data={placeData.ana}
          onHoverData={{ map: "map url here" }}
          focused={this.state.focused === 3}
        />

        <div ref={this.refLocation[3]} />
        <ChartTab
          style={styles}
          cIndex="4"
          cColor="#ad003e"
          data={chartData.checkIn}
          onHoverData={{ map: "map url here" }}
          focused={this.state.focused === 4}
        />

        <div ref={this.refLocation[4]} />
        <ChartTab
          style={styles}
          cIndex="5"
          cColor="#E20034"
          data={chartData.boarding}
          focused={this.state.focused === 5}
        />

        <div ref={this.refLocation[5]} />
        <FlyInOutTab
          style={styles}
          cIndex="6"
          cColor="#ff003d"
          data={flightData.flyOut}
          onHoverData={onHoverData}
          focused={this.state.focused === 6}
        />
      </div>
    );
  }
}
export default Radium(Planner);
