import React, { Component } from "react";
import Radium from "radium";

import Typography from "@material-ui/core/Typography";

const p2Style = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
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
    fontSize: 40,
    fontWeight: 700
  },
  text: {
    fontSize: 18,
    fontWeight: 300,
    width: 500,
    lineHeight: "1.8em",
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

const page_2 = (
  <div style={p2Style.root}>
    <div>
      <Typography style={p2Style.title} variant="headline" component="h2">
        InTransit
      </Typography>
      <p style={p2Style.text}>
        Transiting at an unfamiliar airport can be stressful. <br />
        InTransit eliminates the unknown by building you a <br />
        <strong>personalised schedule between your two flights.</strong> <br />
        No more rushing to board; no more wasted time.
      </p>
    </div>

    {/* <img style={p2Style.image} src={images["bg/man.jpeg"]} /> */}
  </div>
);

class Page extends Component {
  render() {
    return page_2;
  }
}
export default Radium(Page);
