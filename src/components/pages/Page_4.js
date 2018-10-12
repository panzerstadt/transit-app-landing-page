import React, { Component } from "react";
import Radium from "radium";
import Button from "@material-ui/core/Button";

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
    transition: "all 150ms ease 500ms",
    // height: 500,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100vh",
    margin: "0 auto",
    marginTop: 100,
    backgroundColor: "#FDFDFD",
    color: "#1E1B0E",
    zIndex: 0
  },
  button: {
    root: {
      zIndex: 1000,
      position: "relative",
      width: "100%",
      top: -35,
      height: 0
    },
    bar: {
      borderRadius: 999,
      border: "none",
      width: 250,
      minHeight: 6,
      padding: 0,
      margin: 0,
      backgroundColor: "#D4ECF9",
      boxShadow: "0 0 5px white"
    }
  },
  text: {
    fontSize: 15,
    width: 280,
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
    padding: 0,
    "@media (min-width: 1100px)": {
      padding: "15px 50px 50px 50px"
    }
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

let refOffsetY;

class Page extends Component {
  state = {
    showPage4: false
  };
  handleClick = this.handleClick.bind(this);
  scrollSlowly = this.scrollSlowly.bind(this);
  refLocation = [1, 2].map(() => {
    return React.createRef();
  });

  scrollSlowly(direction) {
    let sY = window.scrollY;
    let targetY = refOffsetY[0];

    if (direction === "down") {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else if (direction === "up") {
      window.scrollTo({
        top: targetY - window.innerHeight,
        behavior: "smooth"
      });
    }

    //console.log(sY, this.refLocation[0].current.offsetTop);
  }

  handleClick() {
    if (!this.state.showPage4) {
      this.setState({ showPage4: true });
      setTimeout(() => {
        this.scrollSlowly("down");
      }, 300);
    } else {
      this.scrollSlowly("up");
      setTimeout(() => {
        this.setState({ showPage4: false });
      }, 1000);
    }
  }

  componentDidMount() {
    refOffsetY = this.refLocation.map(r => {
      if (r.current) {
        return r.current.offsetTop;
      }
    });
  }

  render() {
    const page_4_full = (
      <div
        style={{
          ...p4Style.root,
          display: this.state.showPage4 ? "flex" : "none"
        }}
      >
        {avatars(avatar_data)}
        <p style={p4Style.footer}>
          © 2018 some company. <br />
          <br />
          terms and conditions
        </p>
      </div>
    );

    const page_4 = (
      <div ref={this.refLocation[0]}>
        <div className="about-btn" style={p4Style.button.root}>
          <Button
            children={""}
            style={p4Style.button.bar}
            variant="outlined"
            color="primary"
            onClick={this.handleClick}
          />
        </div>
        {page_4_full}
      </div>
    );

    return page_4;
  }
}

export default Radium(Page);
