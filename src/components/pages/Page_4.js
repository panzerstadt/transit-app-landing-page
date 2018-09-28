import React, { Component } from "react";
import Radium from "radium";

import en_lorem_ipsum from "../../assets/lorem_ipsum/lorem-ipsum-en.txt";
import ja_lorem_ipsum from "../../assets/lorem_ipsum/lorem-ipsum-ja.txt";

import dude_1 from "../../assets/avatar/2Asset 3.svg";
import dude_2 from "../../assets/avatar/2Asset 4.svg";
import dude_3 from "../../assets/avatar/2Asset 10.svg";
import dude_4 from "../../assets/avatar/2Asset 1.svg";

function readTextFile(file) {
  // https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
  var rawFile = new XMLHttpRequest();
  var outFile;
  rawFile.open("GET", file, false);
  rawFile.onload = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        outFile = allText;
      }
    }
  };
  rawFile.send(null);
  return outFile;
}

const p4Style = {
  root: {
    // height: 500,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    backgroundColor: "#FDFDFD",
    color: "#1E1B0E",
    zIndex: 0
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
    padding: "15px 50px 50px 50px"
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
  return data.map((d, i) => {
    return (
      <div key={i} style={p4Style.avatar_box}>
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

class Page extends Component {
  render() {
    return page_4;
  }
}

export default Radium(Page);
