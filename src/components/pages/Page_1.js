import React, { Component } from "react";
import Radium from "radium";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
let images = importAll(require.context("../../assets", true, /.*\.jpeg$/));

const p1Style = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    paddingTop: 30,
    paddingBottom: 30,
    boxShadow: "0 0 50px #EAEFF2",
    zIndex: 10,
    transition: "all 2000ms ease"
  },
  title: {
    fontSize: 30,
    fontWeight: 500
  },
  text: {
    fontSize: 18,
    fontWeight: 300,
    lineHeight: "1.6em",
    width: 320,
    "@media (max-width: 350px)": {
      fontSize: 14
    }
  },
  image: {
    transition: "all 2000ms ease",
    height: 400,
    padding: "0 50px 30px 50px",
    ":hover": {
      filter: "drop-shadow(0 0 10px #8A8F9B)"
    },
    "@media (min-width: 1100px)": {
      height: 600
    }
  },
  button: {
    width: 120,
    margin: 10,
    ios: {
      borderColor: "#007AFF",
      color: "#007AFF"
    },
    android: {
      borderColor: "#A4C639",
      color: "#A4C639"
    }
  },
  divRight: {
    "@media (min-width: 1100px)": {
      marginLeft: 100
    },
    marginLeft: 0,
    padding: "0 30px 0 30px"
  }
};

const page_1 = (
  <div style={p1Style.root}>
    <div>
      <Typography style={p1Style.title} variant="headline" component="h2">
        Time well spent, <br />
        for people well travelled.
      </Typography>
      <p style={p1Style.text}>
        Let it take care of your transit planning. <br />
        Know what to expect at the airport. <br />
        Travel like you’ve been there before.
      </p>
    </div>

    <div style={p1Style.divRight}>
      <img style={p1Style.image} src={images["phone/phone.jpeg"]} />
      <div>
        <Button
          style={{ ...p1Style.button, ...p1Style.button.ios }}
          variant="outlined"
          color="primary"
        >
          iOS {"\u00A0"}
          <img style={{ height: 15 }} src={app_store} alt="icon" />
        </Button>
        <Button
          //style={{ ...p1Style.button, ...p1Style.button.android }}
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
