import React, { Component } from "react";
import Radium from "radium";
import Lottie from "react-lottie";

import airplaneAnimationData from "../../assets/animation/flight_icon_interaction.json";

import Planner from "../subcomponents/planner";

// settings
let textBoxWidth = 300;
// variables
let sY = 0;
let refOffsetY = [];
let windowHeight = window.innerHeight;

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
  top: {
    width: "100%",
    paddingTop: 300,
    "@media (min-width: 1100px)": {
      paddingRight: 600
    }
  },
  bottom: {
    width: "100%",
    paddingTop: 400,
    paddingBottom: 300,
    "@media (min-width: 1100px)": {
      paddingRight: 600
    }
  }
};

const p3Style = {
  root: {
    // height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "0 auto",
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
    lineHeight: 1.5
  },
  title: {
    fontSize: 30,
    fontWeight: 100,
    width: textBoxWidth
  },
  textBox: {
    position: "fixed",
    top: "40%",
    margin: "0 auto",
    "@media (min-width: 1100px)": {
      right: 0,
      marginRight: 300
    },
    padding: 10,
    backgroundColor: "#ffffffcc"
  },
  textBoxIE11: {
    position: "absolute",
    margin: "0 auto",
    "@media (min-width: 1100px)": {
      right: 0,
      marginRight: 200
    }
  },
  image: {
    width: 300
    //padding: 100
  },
  planner: {
    "@media (min-width: 1100px)": {
      marginRight: 600
    }
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
      focusItem: 0,
      showText: false
    };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.refLocation = [1, 2].map(() => {
      return React.createRef();
    });
  }

  // this scroll listener is only for page wide animations
  // the scroll listener for planner tab positions are in planner
  componentDidMount() {
    // listen to scroll
    window.addEventListener("scroll", this.handlePageScroll);
    refOffsetY = this.refLocation.map(r => {
      return r.current.offsetTop;
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handlePageScroll);
  }

  handlePageScroll() {
    sY = window.scrollY;
    //console.log(sY, refOffsetY, " window height ", windowHeight);
    if (refOffsetY[0] <= sY && sY <= refOffsetY[1] - windowHeight) {
      if (!this.state.showText) this.setState({ showText: true });
    } else {
      if (this.state.showText) this.setState({ showText: false });
    }
  }

  onFocusChange(v) {
    let newVal = v; // business logic function here
    this.setState({ focusItem: newVal });
  }

  render() {
    // const parse_breakpoint = text => {
    //   const processed_content = text.split("\n").map(d => {
    //     return d;
    //   });

    //   let html_content = { __html: processed_content.join("<br/>") };

    //   return <span dangerouslySetInnerHTML={html_content} />;
    // };

    // text logic here
    let page_3_text = {};
    p3FocusText.map(v => {
      let text_out = (
        <div style={p3Style.textBox}>
          <p style={p3Style.title}>{v.title}</p>
          <p style={p3Style.text}>{v.text}</p>
        </div>
      );

      if (typeof v.focusItem === "number") {
        page_3_text[v.focusItem] = text_out;
      } else {
        // todo: do not use object values, because it doesn't exist in internet explorer
        let list_of_values = Object.keys(v.focusItem).map(e => {
          return v.focusItem[e];
        });
        list_of_values.forEach(w => {
          page_3_text[w] = text_out;
        });
      }
    });

    let isIE = /*@cc_on!@*/ false || !!document.documentMode;
    //console.log("ie? ", isIE);

    const compatible_planner = () => {
      if (isIE) {
        // insert conditional IE code here
        console.log("you are running internet explorer 11 and below.");
        return (
          <img
            style={{ ...p3Style.image, ...p3Style.planner }}
            src={images["bg/path.jpeg"]}
          />
        );
      } else {
        return (
          <Planner onFocusChange={this.onFocusChange} style={p3Style.planner} />
        );
      }
    };

    const compatible_p3_text = () => {
      if (isIE) {
        // insert conditional IE code here
        let v = p3FocusText[0];
        return (
          <div style={p3Style.textBoxIE11}>
            <p style={p3Style.title}>{v.title}</p>
            <p style={p3Style.text}>{v.text}</p>
          </div>
        );
      } else {
        return page_3_text[this.state.focusItem];
      }
    };

    // build output format here
    const page_3 = (
      <div style={p3Style.root}>
        <div ref={this.refLocation[0]} />
        <div style={animStyle.top}>
          <Lottie options={landingAnimation} height={300} width={300} />
        </div>

        {compatible_planner()}
        {this.state.showText ? compatible_p3_text() : null}

        <div style={animStyle.bottom}>
          <Lottie options={landingAnimation} height={300} width={300} />
        </div>
        <div ref={this.refLocation[1]} />
      </div>
    );

    return page_3;
  }
}
export default Radium(Page);
