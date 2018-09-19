import React, { Component } from "react";
import Radium from "radium";

import Page1 from "./pages/Page_1";
import Page2 from "./pages/Page_2";
import Page3 from "./pages/Page_3";
import Page4 from "./pages/Page_4";

let all_pages = [
  <Page1 key={0} />,
  <Page2 key={1} />,
  <Page3 key={2} />,
  <Page4 key={3} />
];

const scrollComponentStyle = {
  display: "flex",
  flexDirection: "column"
};

class Scroll extends Component {
  render() {
    return <div style={scrollComponentStyle}>{all_pages}</div>;
  }
}

export default Radium(Scroll);
