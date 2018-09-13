import React, { Component } from "react";
import Radium from "radium";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import en_lorem_ipsum from "../assets/lorem_ipsum/lorem-ipsum-en.txt";
import ja_lorem_ipsum from "../assets/lorem_ipsum/lorem-ipsum-ja.txt";

import dude_1 from "../assets/avatar/2Asset 3.svg";
import dude_2 from "../assets/avatar/2Asset 4.svg";
import dude_3 from "../assets/avatar/2Asset 10.svg";
import dude_4 from "../assets/avatar/2Asset 1.svg";

import play_store from "../assets/icons/store-google.svg";
import app_store from "../assets/icons/store-apple.svg";

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
          style={{ ...p1Style.button, ...p1Style.button.android }}
          variant="outlined"
          color="primary"
        >
          Android {"\u00A0"}
          <img style={{ height: 15 }} src={play_store} alt="icon" />
        </Button>
      </div>
    </div>
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
      fontSize: 14,
      width: 360
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
    width: 300,
    lineHeight: "1.5em"
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
    {/* <img style={p3Style.image} src={images["bg/path.jpeg"]} /> */}
    <Planner />

    <div style={p3Style.textBox}>
      <p style={p3Style.title}>How Does it Work?</p>
      <p style={p3Style.text}>
        From your arrival to your next departure, InTransit guides you
        step-by-step throughout the transit airport. Be prepared for security
        checks, save some time to shop for souvenirs and know when to board.
      </p>
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
