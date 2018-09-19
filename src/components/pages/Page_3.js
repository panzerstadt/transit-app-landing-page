import React, { Component } from "react";
import Radium from "radium";
import Lottie from "react-lottie";

import airplaneAnimationData from "../../assets/animation/flight_icon_interaction.json";

import Planner from "../subcomponents/planner";

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
let images = importAll(require.context("../../assets", true, /.*\.jpeg$/));

const landingAnimation = {
  loop: true,
  autoplay: true,
  animationData: airplaneAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const animStyle = {
  width: "100%",
  "@media (min-width: 1100px)": {
    paddingRight: 530
  }
};

const p3Style = {
  root: {
    // height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    //backgroundColor: "#2F4959",
    //backgroundColor: "white",
    color: "#2F4959",
    //boxShadow: "0 0 50px #C5D4DD",
    boxShadow: "0 0 50px #EAEAEF",
    zIndex: 10
  },
  text: {
    fontSize: 12,
    fontWeight: 100,
    width: 300,
    lineHeight: "1.5em"
  },
  title: {
    fontSize: 30,
    fontWeight: 100
  },
  textBox: {
    "@media (min-width: 1100px)": {
      marginLeft: 100
    },
    padding: 60
  },
  image: {
    height: "100%",
    padding: 100
  }
};

const page_3 = (
  <div style={p3Style.root}>
    <div style={animStyle}>
      <Lottie options={landingAnimation} height={300} width={300} />
    </div>

    {/* <img style={p3Style.image} src={images["bg/path.jpeg"]} /> */}
    <Planner />

    <div style={p3Style.textBox}>
      <p style={p3Style.title}>How Does it Work?</p>
      <p style={p3Style.text}>
        From your arrival to your next departure, InTransit guides you
        step-by-step throughout the transit airport. Be prepared for security
        checks, save some time to shop for souvenirs and know when to board.
      </p>
    </div>

    <div style={animStyle}>
      <Lottie options={landingAnimation} height={300} width={300} />
    </div>
  </div>
);

class Page extends Component {
  render() {
    return page_3;
  }
}
export default Radium(Page);
