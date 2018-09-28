import React, { Component } from "react";
import Radium from "radium";
import Lottie from "react-lottie";

import airplaneAnimationData from "../../assets/animation/flight_icon_interaction.json";

import Planner from "../subcomponents/planner";

// settings
let textBoxWidth = 300;

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
    width: textBoxWidth,
    lineHeight: "1.5em"
  },
  title: {
    fontSize: 30,
    fontWeight: 100
  },
  textBox: {
    position: "fixed",
    right: `calc(50% - ${textBoxWidth / 2})`,
    top: "40%",
    margin: "0 auto",
    "@media (min-width: 1100px)": {
      right: 0,
      marginRight: 200
    }
    //padding: 60
  },
  image: {
    height: "100%",
    padding: 100
  },
  planner: {
    marginRight: 300
  }
};

const p3FocusText = [
  {
    focusItem: 0,
    title: "How Does it Work?",
    text:
      "From your arrival to your next departure, InTransit guides you step-by-step throughout the transit airport. Be prepared for security checks, save some time to shop for souvenirs and know when to board."
  },
  {
    focusItem: 1,
    title: "Hit the Ground Running",
    text:
      "Know immediately where you are when you land on your first visit to a new airport."
  },
  {
    focusItem: [2, 3],
    title: "Explore without Worry",
    text:
      "Let loose and visit exotic shops and enjoy exotic food freely while InTransit keeps track of your time."
  },
  {
    focusItem: [4, 5],
    title: "Check-in and Board, \n Intelligently",
    text:
      "Know when is the best time to go through the security and to arrive at the boarding gate so that you don't have to line up."
  },
  {
    focusItem: 6,
    title: "Know Exactly when \n you Fly",
    text:
      "Notifications keep you updated on any changes to your flights, so that you can enjoy all the airport has to offer you with a peace of mind."
  }
];
class Page extends Component {
  constructor() {
    super();
    this.state = {
      focusItem: 0
    };
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onFocusChange(v) {
    let newVal = v; // business logic function here
    this.setState({ focusItem: newVal });
  }

  render() {
    const parse_breakpoint = text => {
      const processed_content = text.split("\n").map(d => {
        return d;
      });

      let html_content = { __html: processed_content.join("<br/>") };

      return <div dangerouslySetInnerHTML={html_content} />;
    };

    // text logic here
    let page_3_text = {};
    p3FocusText.map(v => {
      let text_out = (
        <div style={p3Style.textBox}>
          <p style={p3Style.title}>{parse_breakpoint(v.title)}</p>
          <p style={p3Style.text}>{v.text}</p>
        </div>
      );

      if (typeof v.focusItem === "number") {
        page_3_text[v.focusItem] = text_out;
      } else {
        Object.values(v.focusItem).forEach(w => {
          page_3_text[w] = text_out;
        });
      }
    });

    console.log(page_3_text);

    // build output format here
    const page_3 = (
      <div style={p3Style.root}>
        <div style={animStyle}>
          <Lottie options={landingAnimation} height={300} width={300} />
        </div>

        {/* <img style={p3Style.image} src={images["bg/path.jpeg"]} /> */}
        <Planner onFocusChange={this.onFocusChange} style={p3Style.planner} />

        {page_3_text[this.state.focusItem]}

        <div style={animStyle}>
          <Lottie options={landingAnimation} height={300} width={300} />
        </div>
      </div>
    );

    return page_3;
  }
}
export default Radium(Page);
