import React, { Component } from "react";
import Radium from "radium";

import InTransitLogo from "../../assets/logo/logo-white.svg";

const p2Style_simple = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: 600,
    margin: "200px auto 0",
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
      fontSize: 14
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
  render() {
    const simple_page_2 = (
      <div style={p2Style_simple.root}>
        <div>
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
      </div>
    );

    return simple_page_2;
  }
}
export default Radium(Page);
