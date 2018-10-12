import React, { Component } from "react";
import Radium from "radium";
import Lottie from "react-lottie";
import Button from "@material-ui/core/Button";

import app_store from "../../assets/icons/store-apple.svg";
import airportCanvas from "../../assets/page-3/airport-canvas-4.svg";
import airplaneAnimationData from "../../assets/animation/flight_icon_interaction.json";

import Planner from "../subcomponents/planner";

// settings
let textBoxWidth = 300;
let aitportSilhouetteHeight = 550;
let airportSilhouetteHorizontalRange = 1200; // ~ half the width of svg
let airportSilhouetteVerticalRange = 380; // == height of svg

// variables
let sY = 0;
let refOffsetY = [];
let windowHeight = window.innerHeight;

function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
    return null;
  });
  //console.log(images);
  return images;
}

// functinos
const locationIndicator = (fromLocationXY, toLocationXY) => {
  // will be based on style

  //TODO: make this responsive
  const indicatorStyleHorizontal = {
    transition: "all 300ms ease",
    position: "fixed",
    top: fromLocationXY[1],
    left: fromLocationXY[0],
    width: toLocationXY[0],
    bottom: toLocationXY[1],
    height: 1,

    borderStyle: "dashed none none none",
    borderWidth: 2,
    borderColor: "#D8497E",

    zIndex: -5
  };

  const indicatorStyleVertical = {
    transition: "all 300ms ease",
    position: "fixed",
    top: fromLocationXY[1],
    left: toLocationXY[0] + fromLocationXY[0],
    width: 1,
    bottom: toLocationXY[1],

    borderStyle: "none dashed none none",
    borderWidth: 2,
    borderColor: "#D8497E",

    zIndex: -5
  };

  // both locations are pixels in X and Y
  // and we use it to build

  // build <div> with backgroundcolor
  return (
    <div>
      <div style={indicatorStyleVertical} />
      <div style={indicatorStyleHorizontal} />
    </div>
  );
};

const pinIndicator = LocationXY => {
  // place a pin at this place
  // probably using material ui icon
  const indicatorStyle = {
    height: 300,
    width: 300,
    transition: "all 300ms ease",
    position: "fixed",
    //top: fromLocationXY[1],
    left: LocationXY[0],
    bottom: LocationXY[1],

    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#D8497E",

    zIndex: 1000
  };

  // map indicator logic here
  const airportSilhouettePin = color => {
    if (!color) {
      color = "red";
    }
    let pinBase = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 85.26 94.73"
        fill={color}
      >
        <title>pin</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M42.63,0A42.61,42.61,0,0,0,31.69,83.79L42.63,94.73,53.57,83.79A42.61,42.61,0,0,0,42.63,0Z" />
          </g>
        </g>
      </svg>
    );

    let pinOut = pinBase;

    return pinOut;
  };

  return (
    <div className="pin-indicator" style={indicatorStyle}>
      {airportSilhouettePin}
    </div>
  );
};

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
    paddingTop: 200,
    paddingBottom: 400,
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
    background: "linear-gradient(#FFFFFF,#CEE5F2, #2978A0 )",
    //backgroundColor: "#2F4959",
    //backgroundColor: "white",
    color: "#2F4959",
    //boxShadow: "0 0 50px #C5D4DD",
    //boxShadow: "0 0 50px #EAEAEF",
    zIndex: 10
  },
  button: {
    backgroundColor: "#ffffffcc",
    width: 250,
    margin: 5,
    borderRadius: 999,
    boxShadow: "0 0 20px #CEE5F255",
    ios: {
      //borderColor: "#007AFF",
      borderColor: "transparent",
      color: "#007AFF",
      fontSize: 20
    },
    android: {
      borderColor: "#A4C639",
      color: "#A4C639"
    },
    disabled: {
      borderColor: "lightgrey",
      color: "lightgrey"
    }
  },
  airportSilhouette: {
    div: {
      //transition: "opacity 100ms linear",
      transition: "left 300ms ease, bottom 300ms ease",
      opacity: 0,
      position: "fixed",
      zIndex: 1,
      bottom: 0,
      left: -1800,
      overflowX: "visible",
      height: "50vh",
      width: "100vw"
    },
    silhouette: {
      position: "absolute",
      height: aitportSilhouetteHeight,
      bottom: 0,
      left: 0
      //overflowX: "hidden"
    }
  },
  text: {
    transition: "all 300ms ease",
    fontSize: 12,
    fontWeight: 100,
    width: textBoxWidth,
    lineHeight: 1.5
  },
  title: {
    fontSize: 30,
    fontWeight: 100,
    width: textBoxWidth,
    transition: "color 500ms ease, font-size 300ms ease"
  },
  textBox: {
    transition: "all 150ms ease 300ms",
    zIndex: 2,
    opacity: 1,
    position: "fixed",
    top: "68%",
    margin: "0 auto",
    "@media (min-width: 1100px)": {
      right: 0,
      marginRight: 300
    },
    padding: 3
    //backgroundColor: "#ffffffcc"
  },
  textBoxIE11: {
    position: "absolute",
    margin: "0 auto",
    "@media (min-width: 1100px)": {
      right: 0,
      marginRight: 200
    }
  },
  bottomText: {
    fontSize: 40,
    fontFamily: '"Cormorant", sans-serif',
    fontWeight: 100,
    color: "#ffffff",
    width: "100%",
    textShadow: "0 0 5px #CEE5F255",
    paddingBottom: 30
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
    textBoxStyle: p3Style.textBox,
    titleStyle: p3Style.title,
    textStyle: p3Style.text,
    title: "How Does it Work?",
    text:
      "From your arrival to your next departure, InTransit guides you step-by-step throughout the transit airport. Be prepared for security checks, save some time to shop for souvenirs and know when to board."
  },
  {
    focusItem: 1,
    textBoxStyle: p3Style.textBox,
    titleStyle: p3Style.title,
    textStyle: p3Style.text,
    title: "Hit the Ground Running",
    text:
      "Know immediately where you are when you land on your first visit to a new airport."
  },
  {
    focusItem: [2, 3],
    textBoxStyle: p3Style.textBox,
    titleStyle: p3Style.title,
    textStyle: p3Style.text,
    title: "Explore without Worry",
    text:
      "Let loose and visit exotic shops and enjoy exotic food freely while InTransit keeps track of your time."
  },
  {
    focusItem: [4, 5],
    textBoxStyle: p3Style.textBox,
    titleStyle: p3Style.title,
    textStyle: p3Style.text,
    title: "Check-in and Board, \n Intelligently",
    text:
      "Know when is the best time to go through the security and to arrive at the boarding gate so that you don't have to line up."
  },
  {
    focusItem: 6,
    textBoxStyle: p3Style.textBox,
    titleStyle: p3Style.title,
    textStyle: p3Style.text,
    title: "Know Exactly when \n you Fly",
    text:
      "Notifications keep you updated on any changes to your flights, so that you can enjoy all the airport has to offer you with a peace of mind."
  },
  {
    focusItem: 7,
    textBoxStyle: p3Style.textBox,
    titleStyle: p3Style.title,
    textStyle: p3Style.text,
    title: "",
    text: ""
  }
];
class Page extends Component {
  constructor() {
    super();
    this.state = {
      focusItem: 0,
      showText: false,
      showSilhouette: false,
      silhouetteHPos: 0,
      silhouetteVPos: 0,
      silhouetteRange: -1800,
      tabLocations: {}
    };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onFirstMount = this.onFirstMount.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.refLocation = [1, 2].map(() => {
      return React.createRef();
    });
  }

  // this scroll listener is only for page wide animations
  // the scroll listener for planner tab positions are in planner
  componentDidMount() {
    // listen to scroll (when scroll happens, call handlePageScroll)
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
    let overscrollBuffer = 300;

    //console.log(sY, refOffsetY, " window height ", windowHeight);
    let handleShow = () => {
      // showText
      if (
        refOffsetY[0] - windowHeight / 3 <= sY &&
        sY <= refOffsetY[1] - windowHeight + overscrollBuffer
      ) {
        if (!this.state.showText) this.setState({ showText: true });
      } else {
        if (this.state.showText) this.setState({ showText: false });
      }

      //showSilhouette
      if (
        refOffsetY[0] - windowHeight <= sY &&
        sY <= refOffsetY[1] - windowHeight + overscrollBuffer
      ) {
        if (!this.state.showSilhouette) this.setState({ showSilhouette: true });
      } else {
        if (this.state.showSilhouette) this.setState({ showSilhouette: false });
      }
    };

    let handleSilhouette = () => {
      // left position
      let pos = normalize(
        sY,
        refOffsetY[0],
        refOffsetY[1],
        0,
        -airportSilhouetteHorizontalRange
      );
      // down position
      const startDist = windowHeight * 2;
      let vPos = 0;
      if (refOffsetY[1] - sY <= startDist) {
        //
        const pageBottomRefLine = refOffsetY[1] - windowHeight;
        vPos = normalize(
          sY,
          pageBottomRefLine - airportSilhouetteVerticalRange,
          pageBottomRefLine,
          0,
          -airportSilhouetteVerticalRange
        );
      }

      if (refOffsetY[0] - windowHeight <= sY && sY <= refOffsetY[1]) {
        // cap it to prevent overshoot
        this.setState({
          silhouetteHPos: Math.max(pos, -airportSilhouetteHorizontalRange),
          silhouetteVPos: vPos
        });
      } else {
        console.log("not moving canvas");
      }
    };

    let handleAll = () => {
      handleShow();
      handleSilhouette();
    };

    // prevent scroll lag by calling setstate only after the frame
    // has been rendered
    window.requestAnimationFrame(handleAll);
  }

  onFocusChange(v) {
    let newVal = v; // business logic function here
    this.setState({ focusItem: newVal });
  }

  onFirstMount(v) {
    this.setState({ tabLocations: v });
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
        <div
          style={{ ...v.textBoxStyle, opacity: this.state.showText ? 1 : 0 }}
        >
          <p style={v.titleStyle}>{v.title}</p>
          <p style={v.textStyle}>{v.text}</p>
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
          <Planner
            onFocusChange={this.onFocusChange}
            onFirstMount={this.onFirstMount}
            style={p3Style.planner}
          />
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

    // this animation is for place tabs only (2 and 3)
    const indicatorAnimation = () => {
      if (this.state.focusItem === 2 || this.state.focusItem === 3) {
        //do something
        const buffer = 400; // has to match buffer in planner
        const imgLocOffset = 200;
        // get offsets for tab locations (index 0 is tab 1, 1 is tab 2)
        const tabLoc = this.state.tabLocations;

        const tab2 = () => {
          // tab 2 ref position
          const tab2Pos = tabLoc[1];
          // array of x, y
          let scrollYWithBuffer = tab2Pos - window.scrollY + imgLocOffset;
          let scrollXWithBuffer = 760 + this.state.silhouetteHPos;
          const fromLocation = [410, scrollYWithBuffer];
          const toLocation = [scrollXWithBuffer, 280];

          console.log(window.scrollY);
          return pinIndicator(toLocation);
          //return locationIndicator(fromLocation, toLocation);
        };

        return tab2();
      } else if (this.state.focusItem === 3) {
        // do something else
        return null;
      }
    };

    // TODO: wipe down to dark blue, add side scrolling stars
    // plane flies infinitely, final copy text appears, CTA button appears
    const airport_div = (
      <div
        style={{
          ...p3Style.airportSilhouette.div,
          opacity: this.state.showSilhouette ? 1 : 0,
          left: this.state.silhouetteHPos,
          bottom: this.state.silhouetteVPos
        }}
      >
        <img
          style={{
            ...p3Style.airportSilhouette.silhouette
          }}
          src={airportCanvas}
          alt="canvas"
        />
        {/* {indicatorAnimation()} */}
      </div>
    );

    // build output format here
    const page_3 = (
      <div style={p3Style.root}>
        <div ref={this.refLocation[0]} />
        <div style={animStyle.top}>
          <Lottie options={landingAnimation} height={300} width={300} />
        </div>

        {compatible_planner()}
        {compatible_p3_text()}
        {airport_div}
        {indicatorAnimation()}

        <div style={animStyle.bottom}>
          <Lottie options={landingAnimation} height={300} width={300} />
        </div>
        <div
          style={{
            position: "relative",
            bottom: "30vh"
          }}
        >
          <p style={p3Style.bottomText}>Ready to try it out ?</p>
          <Button
            style={{ ...p3Style.button, ...p3Style.button.ios }}
            variant="outlined"
            color="primary"
          >
            iOS {"\u00A0"}
            <img style={{ height: 15 }} src={app_store} alt="icon" />
          </Button>
        </div>
        <div ref={this.refLocation[1]} />
      </div>
    );

    return page_3;
  }
}
export default Radium(Page);
