import React, { Component } from "react";
import Radium from "radium";

import Typography from "@material-ui/core/Typography";

import InTransitLogo from "../../assets/logo/logo-white.svg";

const gradientKeyframes = Radium.keyframes({
  "0% 100%": {
    backgroundPosition: "50% 0%"
  },
  "50%": {
    backgroundPosition: "50% 100%"
  }
});

const p2Style_svg = {
  rootTest: {
    display: "block",
    height: "100%",
    overflow: "hidden",
    textAlign: "left",
    fontWeight: 100
  },
  bodyTest: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "35em",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(0deg, #fda9a9, #5fc3e4)",
    backgroundSize: "400% 400%",
    animation: "x 15s ease infinite",
    animationName: gradientKeyframes
  },
  svg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    text: {
      textAnchor: "middle"
    },
    maskRect: {
      fill: "rgba(255, 255, 255, 1"
    },
    rect: {
      fill: "white",
      mask: 'url("#mask")'
    }
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    overflow: "hidden",
    margin: "0 auto",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#FCFEFF",
    zIndex: 0,
    "@media (max-width: 500px)": {
      width: "100%"
    }
  },

  title: {
    padding: 20,
    fontSize: 100,
    fontWeight: 700,
    titleText: {
      fontFamily: "'Josefin Slab', serif", //josefin, kameron, spectral, cormorant, fanwood
      //color: "#2F4959",
      padding: "10px 15px 5px 15px",
      border: "3px solid #2F4959"
    }
  },
  text: {
    fontSize: 30,
    fontWeight: 400,
    width: 375,
    maxWidth: 450,
    lineHeight: "1.6em",
    textShadow: "0 0 3px #DBDBDB",
    "@media (max-width: 500px)": {
      fontSize: 13,
      width: 320
    }
  },
  image: {
    width: 300
  }
};

const p2Style_simple = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    margin: "0 auto",
    paddingTop: 30,
    paddingBottom: 30,
    //backgroundColor: "#FCFEFF",
    zIndex: 0,
    "@media (max-width: 500px)": {
      width: "100%"
    }
  },
  title: {
    padding: 20,
    fontSize: 50,
    fontWeight: 700,
    titleText: {
      height: 50,

      "@media (min-width: 600px)": {
        height: 100,
        paddingBottom: 30
      }
      //fontFamily: "'Josefin Slab', serif", //josefin, kameron, spectral, cormorant, fanwood
      //color: "#2F4959",
      //padding: "10px 15px 5px 15px"
      //border: "5px solid black"
    }
  },
  text: {
    fontSize: 13,
    fontWeight: 300,
    width: 320,
    lineHeight: "1.4em",
    //textShadow: "0 0 2px #DBDBDB",
    "@media (min-width: 330px)": {
      fontSize: 14.5
    },
    "@media (min-width: 500px)": {
      fontSize: 18,
      width: 500
    }
  },
  image: {
    width: 300
  }
};

class Page extends Component {
  state = {
    windowSize: {
      height: 0,
      width: 0
    }
  };
  handleWindowResize = this.handleWindowResize.bind(this);

  handleWindowResize() {
    this.setState({
      windowSize: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  render() {
    const page_2_svg = () => {
      const text = [
        "Transiting at an unfamiliar airport can be stressful.",
        "InTransit eliminates the unknown by building you a",
        "(strong)personalised schedule between your two flights.",
        "No more rushing to board; no more wasted time."
      ];

      const svgTextBox = sentence_list => {
        const fWeights = [100, 300, 400, 700, 900];
        const postitionFromTop = 600;
        const widthProportion = this.state.windowSize.width / 1920;
        const maxWidth = p2Style_svg.text.maxWidth;
        const width = Math.min(
          (p2Style_svg.text.width / 100) * widthProportion,
          (maxWidth / 100) * 0.2
        );
        //console.log("width of page 2, ", width, maxWidth);
        const fontSize = p2Style_svg.text.fontSize * width;
        const fontWeight = p2Style_svg.text.fontWeight;

        const lineHeight = () => {
          let size = parseFloat(p2Style_svg.text.lineHeight.split("em")[0]);
          return fontSize * size;
        };

        const sentences = sentence_list.map((v, i) => {
          let moveDown = i * lineHeight() + postitionFromTop;
          let adjustedFontWeight = fontWeight;

          let weightCheck = v.split("(strong)");
          if (weightCheck.length > 1) {
            adjustedFontWeight = fWeights.find(e => e > fontWeight);
            v = weightCheck[1];
          }

          return (
            <text
              style={{
                ...p2Style_svg.svg.text,
                fontSize: fontSize,
                fontWeight: adjustedFontWeight
              }}
              x="960"
              y={moveDown}
            >
              {v}
            </text>
          );
        });

        return sentences;
      };
      return (
        <div style={p2Style_svg.rootTest}>
          <div style={p2Style_svg.bodyTest}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1920 1080"
              width="1920px"
              height="1080px"
              preserveAspectRatio="xMidYMid slice"
              style={p2Style_svg.svg}
            >
              <defs>
                <mask id="mask" x="0" y="0" width="1920" height="1080">
                  <rect
                    style={p2Style_svg.svg.maskRect}
                    x="0"
                    y="0"
                    width="1920"
                    height="1080"
                  />
                  <text
                    style={{
                      ...p2Style_svg.svg.text,
                      ...p2Style_svg.title,
                      ...p2Style_svg.title.titleText
                    }}
                    x="960"
                    y="40%"
                  >
                    InTransit
                  </text>

                  {svgTextBox(text)}
                </mask>
              </defs>
              <rect
                style={p2Style_svg.svg.rect}
                mask="url(#mask)"
                x="0"
                y="0"
                width="1920"
                height="1080"
              />
            </svg>
          </div>
        </div>
      );
    };

    const old_page_2 = (
      <div style={p2Style_simple.root}>
        <div>
          {/* <Typography
            style={p2Style_simple.title}
            variant="headline"
            component="h2"
          >
            <span style={p2Style_simple.title.titleText}>InTransit</span>
          </Typography> */}
          <img src={InTransitLogo} style={p2Style_simple.title.titleText} />
          <p style={p2Style_simple.text}>
            Transiting at an unfamiliar airport can be stressful. <br />
            InTransit eliminates the unknown by building you a <br />
            <strong>
              personalised schedule between your two flights.
            </strong>{" "}
            <br />
            No more rushing to board; no more wasted time.
          </p>
        </div>

        {/* <img style={p2Style_simple.image} src={images["bg/man.jpeg"]} /> */}
      </div>
    );

    //return old_page_2;
    return page_2_svg();
  }
}
export default Radium(Page);
