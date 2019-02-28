import React, { Component } from "react";
import Radium from "radium";

import Page1 from "./pages/Page_1";
import Page2 from "./pages/Page_2";
import Page3 from "./pages/Page_3";
import Page4 from "./pages/Page_4";
import Page5 from "./pages/TOC";

let all_pages = [
  <Page1 key={"page-1"} />,
  <Page2 key={"page-2"} />,
  <Page3 key={"page-3"} />,
  <Page4 key={"page-4"} />,
  <Page5 key={"page-5"} />
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
