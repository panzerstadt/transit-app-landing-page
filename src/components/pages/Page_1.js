import React, { Component } from "react";
import Radium from "radium";

import Button from "@material-ui/core/Button";
//import Typography from "@material-ui/core/Typography";

import play_store_disabled from "../../assets/icons/store-google-disabled.svg";
import app_store from "../../assets/icons/store-apple.svg";

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
let images = importAll(require.context("../../assets", true, /.*\.png$/));

const p1Style = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "100vh",
    width: "100%",
    margin: "0 auto",
    boxShadow: "0 0 50px #EAEFF2",
    zIndex: 100,
    transition: "height 300ms ease",
    "@media (min-width: 700px)": {
      flexDirection: "row"
    }
  },
  title: {
    paddingTop: 60,
    fontSize: 24,
    fontWeight: 700,
    "@media (min-width: 700px)": {
      fontSize: 30
    }
  },
  text: {
    fontSize: 15,
    fontWeight: 300,
    lineHeight: "1.4em",
    marginBottom: 30,
    width: "100%",
    "@media (min-width: 700px)": {
      fontSize: 18
    }
  },
  image: {
    transition: "height 300ms ease",
    height: 600,
    marginBottom: 20
  },
  button: {
    width: 120,
    margin: 5,
    borderRadius: 8,
    ios: {
      backgroundColor: "#007AFF",
      borderColor: "rgb(21, 134, 255)",
      color: "white"
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
  divRight: {
    "@media (min-width: 1100px)": {
      marginLeft: 100
    },
    marginLeft: 0
    //padding: "0 30px 0 30px"
  }
};

const page_1 = (
  <div id="top" style={p1Style.root}>
    <div>
      <h2 style={p1Style.title}>
        Time well spent, <br />
        for people well travelled.
      </h2>
      <p style={p1Style.text}>
        Let it take care of your transit planning. <br />
        Know what to expect at the airport. <br />
        Travel like you’ve been there before.
      </p>
    </div>

    <div style={p1Style.divRight}>
      <img
        style={p1Style.image}
        src={images["phone/phone-departure.png"]}
        alt="iphone"
      />
      <div style={{ marginBottom: 30 }}>
        <Button
          style={{ ...p1Style.button, ...p1Style.button.ios }}
          variant="outlined"
          color="primary"
          type="a"
          href="#"
        >
          iOS {"\u00A0"}
          <img style={{ height: 15 }} src={app_store} alt="icon" />
        </Button>
        <Button
          style={{ ...p1Style.button, ...p1Style.button.disabled }}
          variant="outlined"
          disabled
          color="default"
        >
          Android {"\u00A0"}
          <img style={{ height: 15 }} src={play_store_disabled} alt="icon" />
        </Button>
      </div>
    </div>
  </div>
);

class Page extends Component {
  render() {
    return page_1;
  }
}
export default Radium(Page);
