import React, { Component } from "react";
import Radium from "radium";
//import Button from "@material-ui/core/Button";

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
let images = importAll(
  require.context("../../assets/avatar", true, /.*\.png$/)
);

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
    //transition: "all 150ms ease 500ms",
    // height: 500,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexWrap: "wrap",
    minHeight: "100vh",
    margin: "0 auto",
    //marginTop: 100,
    backgroundColor: "#011627",
    color: "white",
    //backgroundColor: "#FDFDFD",
    //color: "#1E1B0E",
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
      width: 100,
      minHeight: 6,
      padding: 0,
      margin: 0,
      backgroundColor: "#D4ECF9",
      boxShadow: "0 0 5px white"
    }
  },
  text: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 15,
    width: 280,
    fontWeight: 100,
    lineHeight: 1.3
    //textShadow: "0 2px 3px #EDEEEF"
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    margin: "40px 0 0 0"
    //textShadow: "0 2px 3px #EDEEEF"
  },
  imageDiv: {
    height: 200,
    width: 200,
    overflow: "hidden",
    padding: 10,
    borderRadius: 999,
    backgroundColor: "white"
  },
  image: {
    height: 200
  },
  avatar_box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 10px 0 ",
    "@media (min-width: 1100px)": {
      padding: "15px 50px 50px 50px"
    }
  },
  footer: {
    pointerEvents: "none",
    paddingTop: 30,
    paddingBottom: 40,
    color: "lightgrey",
    width: "100%",
    fontSize: 14,
    fontWeight: 500
  },
  tnc: {
    pointerEvents: "all",
    textDecoration: "none",
    color: "lightgrey"
  },
  header: {
    fontSize: 24,
    width: "100%",
    fontWeight: 700,
    //textShadow: "0 2px 3px #EDEEEF",
    padding: "50px 0",
    "@media (min-width: 600px)": {
      fontSize: 30
    }
  }
};

const avatar_data = [
  {
    name: "Rahmat Hidayat",
    avatar: images["rahmat.png"],
    text:
      "Rahmat Hidayat has been working in the digital space for over 10 years, won a few International Awards, and has led numerous high-profile projects around the globe in fields such as AI, VR, AR, Web Development, Game Development, Mobile Apps, and Generative Artworks."
  },
  {
    name: "Kyo Hakamata",
    avatar: images["kyo.png"],
    text:
      "An Art Director pursuing to be a bridge between data and UX. Kyo has worked on variety of mediums, anything in the name of graphic design. He has won couple of international awards: Webby, W3, and such. Now he’s focusing on data-driven design to elevate user experiences."
  },
  {
    name: "Piotr Kroujkov",
    avatar: images["piotr.png"],
    text:
      "Passionate about the behaviour changes technology brings, Piotr was working as a data scientist in the airline industry before joining the agency, He now focuses on business and service design."
  },
  {
    name: "Tang Li Qun",
    avatar: images["tang.png"],
    text:
      "Li Qun is constantly experimenting with the latest in web technologies and works in web and app development, graphic design, and UI/UX. Prior to that, he worked in the architecture industry on parametric 3d modelling and design."
  }
];

const avatars = data => {
  return data.map((d, i) => {
    return (
      <div key={i} style={p4Style.avatar_box}>
        <div style={p4Style.imageDiv}>
          <img style={p4Style.image} src={d.avatar} alt={d.name} />
        </div>

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
    //let sY = window.scrollY;
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
      } else {
        return null;
      }
    });
  }

  render() {
    const page_4_full = (
      <div
        style={{
          ...p4Style.root
          // display: this.state.showPage4 ? "flex" : "none"
        }}
      >
        <h2 style={p4Style.header}>Team Members</h2>
        {avatars(avatar_data)}
        <p style={p4Style.footer}>
          © 2018 InTransit. <br />
          <br />
          {/* <a style={p4Style.tnc} href="#top">
            Terms and Conditions
          </a> */}
        </p>
      </div>
    );

    const page_4 = (
      <div ref={this.refLocation[0]}>
        {/* <div className="about-btn" style={p4Style.button.root}>
          <Button
            children={""}
            style={p4Style.button.bar}
            variant="outlined"
            color="primary"
            onClick={this.handleClick}
          />
        </div> */}
        {page_4_full}
      </div>
    );

    return page_4;
  }
}

export default Radium(Page);
