import React, { Component } from "react";

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
let images = importAll(require.context("../assets", true, /.*\.jpeg$/));

const p1Style = {
  root: {
    color: "white",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "red"
  },
  title: {
    fontSize: 25
  },
  text: {
    display: "inline-block",
    fontSize: 15,
    width: 200,
    margin: "0 auto"
  },
  image: {
    display: "inline-block",
    width: 150
  }
};

const page_1 = (
  <div style={p1Style.root}>
    <h1>test title</h1>
    <p style={p1Style.text}>
      test text test text test text test text test text test text
    </p>
    <img style={p1Style.image} src={images["bg/man.jpeg"]} />
    <h1>holy shit</h1>
  </div>
);

const p2Style = {
  root: {
    color: "white",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "grey"
  },
  title: {
    fontSize: 25
  },
  text: {
    display: "inline-block",
    fontSize: 15,
    width: 200,
    margin: "0 auto"
  },
  image: {
    display: "inline-block",
    width: 150
  }
};

const page_2 = (
  <div style={p2Style.root}>
    <h1>test title</h1>
    <p style={p2Style.text}>
      test text test text test text test text test text test text
    </p>
    <img style={p2Style.image} src={images["bg/man.jpeg"]} />
    <h1>holy shit</h1>
  </div>
);

const all_pages = [page_1, page_2, page_1, page_2];

export default class Scroll extends Component {
  render() {
    return all_pages;
  }
}
