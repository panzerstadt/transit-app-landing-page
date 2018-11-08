import React, { Component } from "react";
import Radium from "radium";
import Lottie from "react-lottie";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";

import app_store, {
  ReactComponent as AppStoreLogo
} from "../../assets/icons/store-apple.svg";
import airportCanvas from "../../assets/page-3/airport-canvas-4.svg";
import airplaneLandingData from "../../assets/animation/landing-simple.json";
import airplaneTakeoffData from "../../assets/animation/takeoff-simple.json";
import placePin, {
  ReactComponent as ReactPlacePin
} from "../../assets/page-3/pin.svg";

import Planner from "../subcomponents/planner";

// original silhouette canvas size
// viewBox="0 0 5618 883"

// settings
let textBoxWidth = 300;
let airportSilhouetteHeight = 430; // mental map: scale based on vertical unit
let airportSilhouetteLeftPos = -850; // mental map: initial position (for screen widths >= 1800, this is capped at -1000)
let airportSilhouetteHorizontalRange = 400; // mental map: moves sideways faster
let airportSilhouetteVerticalRange = 380; // == height of svg

// variables
let sY = 0;
let refOffsetY = [];
let windowHeight = window.innerHeight;

/**
 *
 *
 * @param {*} v
 * @param {*} vmin
 * @param {*} vmax
 * @param {*} tmin
 * @param {*} tmax
 * @returns
 */
function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
}

/**
 *
 *
 * @param {*} r
 * @returns
 */
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
/**
 *
 *
 * @param {*} fromLocationXY
 * @param {*} toLocationXY
 * @returns
 */
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

/**
 *
 *
 * @param {*} LocationXY
 * @param {*} img_src
 * @param {*} color
 * @param {*} style
 * @returns
 */
const pinIndicator = (LocationXY, img_src, color, style) => {
  const pinSize = 100;
  if (!style) {
    style = {
      opacity: 0,
      bottom: 50
    };
  }
  // place a pin at this place
  // probably using material ui icon
  const indicatorStyle = {
    div: {
      height: 150,
      width: 150,
      transition: "bottom 800ms ease, left 300ms ease",
      opacity: 1,
      position: "fixed",
      //top: fromLocationXY[1],
      left: LocationXY[0],
      bottom: LocationXY[1] + style.bottom,

      // for debug purposes
      // borderStyle: "dashed",
      // borderWidth: 2,
      // borderColor: "#D8497E",

      zIndex: 1000
    },
    pinLoc: {
      position: "absolute",
      bottom: 0,
      left: 0,
      fill: color
    },
    imgLoc: {
      position: "absolute",
      bottom: 15,
      left: 10,
      height: pinSize - 20,
      width: pinSize - 20,
      borderRadius: 999,
      overflow: "hidden"
    },
    img: {
      height: pinSize - 20
    }
  };

  return (
    <div className="pin-indicator" style={indicatorStyle.div}>
      <ReactPlacePin
        style={indicatorStyle.pinLoc}
        height={pinSize}
        width={pinSize}
      />
      <div style={indicatorStyle.imgLoc}>
        <img style={indicatorStyle.img} src={img_src} alt="img" />
      </div>
    </div>
  );
};

// prepare bg images
let images = importAll(require.context("../../assets", true, /.*\.jpg$/));

const placeData = {
  sushi: {
    type: "food",
    label: "Ariso Sushi",
    image: images["planner/sushi.jpg"],
    price: "2",
    time: "09:30AM - 10:30AM"
  },
  ana: {
    type: "shop",
    label: "Ana Festa",
    image: images["planner/ana.jpg"],
    price: "1",
    time: "10:45AM - 11:15AM"
  }
};

const landingAnimation = {
  loop: true,
  autoplay: true,
  animationData: airplaneLandingData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const takeoffAnimation = {
  loop: true,
  autoplay: true,
  animationData: airplaneTakeoffData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const breatheKeyFrames = Radium.keyframes(
  {
    "0%, 100%": {
      boxShadow: "0 0 5px #CEE5F233"
    },
    "50%": {
      boxShadow: "0 0 100px #CEE5F299"
    }
  },
  "breathe"
);

const p3Style = {
  root: {
    // height: 500,
    overflow: "hidden",
    width: "100%", //width of sky background
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "0 auto",
    background: "linear-gradient(#FFFFFF,#cdebf2, #B9CBE4, #004D7A )",
    //backgroundColor: "#2F4959",
    //backgroundColor: "white",
    color: "#2F4959",
    //boxShadow: "0 0 50px #C5D4DD",
    //boxShadow: "0 0 50px #EAEAEF",
    zIndex: 10
  },
  button: {
    backgroundColor: "#ffffffcc",
    width: 180,
    margin: 5,
    borderRadius: 999,
    height: 40,
    animation: "x 8s ease infinite",
    animationName: breatheKeyFrames,
    transition: "all 500ms ease",
    zIndex: 999,

    borderColor: "transparent",
    color: "#007AFF",
    fontSize: 16,

    ":hover": {
      backgroundColor: "#FCFCFC"
    },
    logo: {
      fill: "#007AFF"
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
      left: -airportSilhouetteHorizontalRange,
      overflowX: "visible",
      height: "28vh",
      width: "100vw"
    },
    silhouette: {
      position: "absolute",
      height: airportSilhouetteHeight,
      bottom: 0,
      left: 0
      //overflowX: "hidden"
    }
  },
  text: {
    transition: "all 300ms ease",
    fontSize: 12,
    fontWeight: 300,
    width: textBoxWidth,
    lineHeight: 1.5
  },
  title: {
    fontSize: 30,
    fontWeight: 300,
    width: textBoxWidth,
    transition: "color 500ms ease, font-size 300ms ease"
  },
  textBox: {
    transition: "all 150ms ease 300ms",
    zIndex: 2,
    opacity: 1,
    position: "fixed",
    bottom: 20,
    height: 180,
    margin: "0 auto",
    // "@media (min-width: 1100px)": {
    //   right: 0,
    //   marginRight: 300
    // },
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
    fontSize: 30,
    fontWeight: 300,
    letterSpacing: "0.3em",
    color: "#ffffff",
    width: "100%",
    textShadow: "0 0 5px #CEE5F255",
    paddingBottom: 100
  },
  image: {
    width: 300
    //padding: 100
  },
  planner: {
    // "@media (min-width: 1100px)": {
    //   marginRight: 600
    // }
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
      silhouetteRange: -airportSilhouetteHorizontalRange,
      tabLocations: {},
      windowSize: {
        height: 0,
        width: 0
      },
      starField: null
    };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onFirstMount = this.onFirstMount.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleAssetShow = this.handleAssetShow.bind(this);
    this.handleAirportSilhouette = this.handleAirportSilhouette.bind(this);
    this.generateStarFieldPos = this.generateStarFieldPos.bind(this);
    this.refLocation = [1, 2].map(() => {
      return React.createRef();
    });
  }

  // this scroll listener is only for page wide animations
  // the scroll listener for planner tab positions are in planner
  componentDidMount() {
    // listen to scroll (when scroll happens, call handlePageScroll)
    window.addEventListener("scroll", this.handlePageScroll);
    window.addEventListener("resize", this.handleWindowResize);
    // get position of all reference points
    refOffsetY = this.refLocation.map(r => {
      return r.current.offsetTop;
    });
    this.handleWindowResize();
    this.generateStarFieldPos(500, 1080, 1920);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handlePageScroll);
    window.addEventListener("resize", this.handleWindowResize);
  }

  generateStarFieldPos(num, height, width) {
    const output = Array(num)
      .fill()
      .map(() => {
        const randHeight = Math.random() * height;
        const randWidth = Math.random() * width;
        let randFill = parseInt(Math.random() * 50 + 50)
          .toString()
          .padStart(2, "0");
        return {
          h: randHeight,
          w: randWidth,
          f: `#ffffff${randFill}`
        };
      });

    this.setState({ starField: output });
  }

  handleAssetShow() {
    sY = window.scrollY;
    let overscrollBuffer = 300;
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
      refOffsetY[0] - windowHeight * 1.2 <= sY &&
      sY <= refOffsetY[1] - windowHeight + overscrollBuffer
    ) {
      if (!this.state.showSilhouette) this.setState({ showSilhouette: true });
    } else {
      if (this.state.showSilhouette) this.setState({ showSilhouette: false });
    }
  }

  handleAirportSilhouette() {
    // every frame takes into account updated window size

    sY = window.scrollY;
    // extra movement based on window width
    let widthCalc = this.state.windowSize.width / 2;

    // left position
    let pos = normalize(
      sY,
      refOffsetY[0],
      refOffsetY[1],
      0,
      -airportSilhouetteHorizontalRange
    );

    if (this.state.windowSize.width >= 1800) {
      const minPos = -1000;
      console.log(Math.min(airportSilhouetteLeftPos, minPos));
      pos = pos + widthCalc + Math.min(airportSilhouetteLeftPos, minPos);
    } else {
      pos = pos + widthCalc + airportSilhouetteLeftPos;
    }

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
        silhouetteHPos: pos,
        silhouetteVPos: vPos
      });
    } else {
      console.log("not moving airport silhouette");
    }
  }

  handlePageScroll() {
    let handleAll = () => {
      this.handleAssetShow();
      this.handleAirportSilhouette();
    };

    // prevent scroll lag by calling setstate only after the frame
    // has been rendered
    window.requestAnimationFrame(handleAll);
  }

  handleWindowResize() {
    // get new window width
    let handleSilhouettePos = () => {
      let width = window.innerWidth;
      let height = window.innerHeight;

      this.setState({
        windowSize: {
          height: height,
          width: width
        }
      });
    };

    let handleAll = () => {
      handleSilhouettePos();
      this.handleAirportSilhouette();
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

    const animStyle = {
      flyIn: {
        position: "absolute",
        zIndex: 50

        // "@media (min-width: 1100px)": {
        //   paddingRight: 600
        // }
      },
      flyOut: {
        position: "absolute",
        zIndex: 50
        // "@media (min-width: 1100px)": {
        //   paddingRight: 600
        // }
      }
    };

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
      const line = (offset = 200, img, xPos, yPos, color) => {
        //do something
        const imgLocOffset = 200;
        // tab 2 ref position
        const tab2PosY = tabLoc[1]; // vertical
        const tab2PosX = 1100; // horizontal in relation to airport silhouette
        // array of x, y
        let scrollYWithBuffer = tab2PosY - window.scrollY + imgLocOffset;
        let scrollXWithBuffer = tab2PosX + this.state.silhouetteHPos;
        const fromLocation = [410, scrollYWithBuffer];
        const toLocation = [scrollXWithBuffer, 280];

        //return pinIndicator(toLocation, img, color);
        return locationIndicator(fromLocation, toLocation);
      };

      const tab = (img, xPos, yPos, color, style) => {
        // tab 2 ref position
        let scrollXWithBuffer = xPos + this.state.silhouetteHPos;
        const toLocation = [scrollXWithBuffer, yPos];

        return pinIndicator(toLocation, img, color, style);
      };

      // get offsets for tab locations (index 0 is tab 1, 1 is tab 2)
      // oh shit this is a bit confusing, but its for vertical (y)
      const tabLoc = this.state.tabLocations;

      let tab2Style =
        this.state.focusItem === 2 || this.state.focusItem === 3
          ? { opacity: 1, bottom: 0 }
          : { opacity: 1, bottom: 1500 };

      let tab3Style =
        this.state.focusItem === 3
          ? { opacity: 1, bottom: -5 }
          : { opacity: 1, bottom: 1500 };

      let output = [
        tab(placeData.sushi.image, 860, 220, "#FED766", tab2Style),
        tab(placeData.ana.image, 970, 220, "#2AB7CA", tab3Style)
      ];

      return output;
    };

    const airplaneAnimation = animType => {
      //background-color: #4158D0;
      // background-image: linear-gradient(315deg, #4158D0 0%, #C850C0 30%, #FFCC70 66%, #ffffff 100%);

      const originalViewBox = {
        width: 5618,
        height: 883
      };

      const scaleMultiplier = airportSilhouetteHeight / originalViewBox.height;

      if (animType === "landing") {
        const flyInAnimationViewBox = {
          width: 2095,
          height: 448
        };

        const animHeight = flyInAnimationViewBox.height * scaleMultiplier;
        const animWidth = flyInAnimationViewBox.width * scaleMultiplier;

        const flyDiv = (
          <div
            className="landing-animation"
            style={{
              ...animStyle.flyIn,

              left: -210,
              bottom: 203
            }}
          >
            <Lottie
              options={landingAnimation}
              height={animHeight}
              width={animWidth}
            />
          </div>
        );
        return flyDiv;
      } else if (animType === "takeoff") {
        const flyOutAnimationViewBox = {
          width: 2560,
          height: 671
        };

        const animHeight = flyOutAnimationViewBox.height * scaleMultiplier;
        const animWidth = flyOutAnimationViewBox.width * scaleMultiplier;

        const flyDiv = (
          <div
            className="takeoff-animation"
            style={{
              ...animStyle.flyOut,

              left: 1030,
              bottom: 203
            }}
          >
            <Lottie
              options={takeoffAnimation}
              height={animHeight}
              width={animWidth}
            />
          </div>
        );
        return flyDiv;
      }

      return null;
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
        {airplaneAnimation("landing")}
        {airplaneAnimation("takeoff")}
        {/* {indicatorAnimation()} */}
      </div>
    );

    const starField = () => {
      const starFieldStyle = {
        root: {
          position: "relative",
          left: "-50%",
          textAlign: "left",
          zIndex: -1
        },
        field: {
          position: "absolute",
          height: 1080,
          width: 1920,
          bottom: 0
          //backgroundColor: "#00000033"
        }
      };

      const star = (
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          strokeWidth="3"
          fill="red"
        />
      );

      let stars = null;
      if (this.state.starField) {
        stars = this.state.starField.map(v => {
          let randFill = parseInt(Math.random() * 50 + 50)
            .toString()
            .padStart(2, "0");

          return (
            <rect
              x={v.w}
              y={v.h}
              width="2"
              height="2"
              fill={`#ffffff${randFill}`}
            />
          );
        });
      }

      return (
        <div style={starFieldStyle.root}>
          <div id="star-field" style={starFieldStyle.field}>
            <svg
              height={starFieldStyle.field.height}
              width={starFieldStyle.field.width}
            >
              {stars}
            </svg>
          </div>
        </div>
      );
    };

    const call_to_action_div = (
      <div
        style={{
          position: "relative",
          bottom: "20vh"
        }}
      >
        <p style={p3Style.bottomText}>
          Excited yet?
          <br />
          give it a go!
        </p>
        <button style={p3Style.button}>
          IOS {"\u00A0"}
          <AppStoreLogo height={15} width={15} style={p3Style.button.logo} />
        </button>
      </div>
    );

    // build output format here
    const page_3 = (
      <div style={p3Style.root}>
        <div ref={this.refLocation[0]} />

        <div style={{ height: 500 }} />
        {compatible_planner()}
        {compatible_p3_text()}
        {airport_div}
        {indicatorAnimation()}

        <div style={{ height: 500 }} />

        {call_to_action_div}
        {starField(10)}
        <div ref={this.refLocation[1]} />
      </div>
    );

    return page_3;
  }
}
export default Radium(Page);
