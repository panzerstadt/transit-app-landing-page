import React, { Component } from "react";

import en_lorem_ipsum from "../assets/lorem_ipsum/lorem-ipsum-en.txt";
import ja_lorem_ipsum from "../assets/lorem_ipsum/lorem-ipsum-ja.txt";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
    return null;
  });
  //console.log(images);
  return images;
}

function readTextFile(file) {
  // https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
  var rawFile = new XMLHttpRequest();
  var outFile;
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        outFile = allText;
      }
    }
  };
  rawFile.send(null);
  return outFile;
}

// prepare bg images
let images = importAll(require.context("../assets", true, /.*\.jpeg$/));

const p1Style = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    color: "white",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "red"
  },
  title: {
    fontSize: 25
  },
  text: {
    fontSize: 15,
    width: 200
  },
  image: {
    width: 300
  }
};

const page_1 = (
  <div style={p1Style.root}>
    <div>
      <h1>test title</h1>
      <p style={p1Style.text}>{readTextFile(en_lorem_ipsum)}</p>
    </div>

    <img style={p1Style.image} src={images["bg/man.jpeg"]} />
  </div>
);

const p2Style = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    color: "white",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "grey"
  },
  title: {
    fontSize: 25
  },
  text: {
    fontSize: 15,
    width: 200
  },
  image: {
    width: 300
  }
};

const page_2 = (
  <div style={p2Style.root}>
    <div>
      <h1>test title</h1>
      <p style={p2Style.text}>{readTextFile(ja_lorem_ipsum)}</p>
    </div>

    <img style={p2Style.image} src={images["bg/man.jpeg"]} />
  </div>
);

const p3Style = {
  root: {
    // height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white"
  },
  text: {
    fontSize: 20,
    width: 300
  },
  image: {
    height: "100%",
    padding: 100
  }
};

const page_3 = (
  <div style={p3Style.root}>
    <img style={p3Style.image} src={images["bg/path.jpeg"]} />

    <div>
      <p style={p3Style.text}>test page 3</p>
      <p style={p3Style.text}>{readTextFile(ja_lorem_ipsum)}</p>
    </div>
  </div>
);

const all_pages = [page_1, page_2, page_3, page_2];

const scrollComponentStyle = {
  display: "flex",
  flexDirection: "column"
};

export default class Scroll extends Component {
  render() {
    return <div style={scrollComponentStyle}>{all_pages}</div>;
  }
}
