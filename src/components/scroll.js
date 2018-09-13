import React, { Component } from "react";
import Radium from "radium";

import en_lorem_ipsum from "../assets/lorem_ipsum/lorem-ipsum-en.txt";
import ja_lorem_ipsum from "../assets/lorem_ipsum/lorem-ipsum-ja.txt";

import dude_1 from "../assets/avatar/2Asset 3.svg";
import dude_2 from "../assets/avatar/2Asset 4.svg";
import dude_3 from "../assets/avatar/2Asset 10.svg";
import dude_4 from "../assets/avatar/2Asset 1.svg";

import Planner from "./subcomponents/planner";

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
    paddingTop: 30,
    paddingBottom: 30,
    boxShadow: "0 0 50px #EAEFF2",
    zIndex: 10
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
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#FCFEFF"
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
    backgroundColor: "#2F4959",
    //backgroundColor: "white",
    color: "#fdfdfd",
    //boxShadow: "0 0 50px #C5D4DD",
    boxShadow: "0 0 50px #EAEAEF",
    zIndex: 10
  },
  text: {
    fontSize: 12,
    fontWeight: 100,
    width: 300
  },
  title: {
    fontSize: 30,
    fontWeight: 100
  },
  textBox: {
    "@media (min-width: 1100px)": {
      marginLeft: 100
    },
    padding: 60
  },
  image: {
    height: "100%",
    padding: 100
  }
};

const page_3 = (
  <div style={p3Style.root}>
    <img style={p3Style.image} src={images["bg/path.jpeg"]} />
    {/* <Planner /> */}

    <div style={p3Style.textBox}>
      <p style={p3Style.title}>How Does it Work?</p>
      <p style={p3Style.text}>{readTextFile(ja_lorem_ipsum)}</p>
    </div>
  </div>
);

const p4Style = {
  root: {
    // height: 500,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    backgroundColor: "#FDFDFD",
    color: "#1E1B0E"
  },
  text: {
    fontSize: 15,
    width: 300,
    fontWeight: 100,
    textShadow: "0 2px 3px #EDEEEF"
  },
  title: {
    fontWeight: 100,
    textShadow: "0 2px 3px #EDEEEF"
  },
  image: {
    height: 200
  },
  avatar_box: {
    padding: 15,
    paddingTop: 50
  },
  footer: {
    paddingTop: 30,
    paddingBottom: 10,
    color: "grey",
    width: "100%",
    fontSize: 12,
    fontWeight: 100
  }
};

const avatar_data = [
  {
    name: "Rahmat Hidayat",
    avatar: dude_3,
    text: readTextFile(en_lorem_ipsum)
  },
  {
    name: "Kyo Hakamata",
    avatar: dude_4,
    text: readTextFile(ja_lorem_ipsum)
  },
  {
    name: "Piotr Kroujkov",
    avatar: dude_1,
    text: readTextFile(en_lorem_ipsum)
  },
  {
    name: "Tang Li Qun",
    avatar: dude_2,
    text: readTextFile(en_lorem_ipsum)
  }
];

const avatars = data => {
  return data.map(d => {
    return (
      <div style={p4Style.avatar_box}>
        <img style={p4Style.image} src={d.avatar} alt={d.name} />
        <h2 style={p4Style.title}>{d.name}</h2>
        <p style={p4Style.text}>{d.text}</p>
      </div>
    );
  });
};

const page_4 = (
  <div style={p4Style.root}>
    {avatars(avatar_data)}
    <p style={p4Style.footer}>
      © 2018 some company. <br />
      <br />
      terms and conditions
    </p>
  </div>
);

const all_pages = [page_1, page_2, page_3, page_4];

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
