import React from "react";
import ReactDOM from "react-dom";
import { Parallax } from "react-spring";

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

console.log(images);
console.log(images["bg/man.png"]);

const someStyle = {
  backgroundImage: `url(${images["bg/man.jpeg"]})`,
  backgroundSize: "cover"
};

const p1Style = {
  root: {
    color: "red"
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

// Little helpers ...
const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

export default class App extends React.Component {
  render() {
    const { myprop } = this.props;

    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={3}>
        <Parallax.Layer
          offset={1}
          speed={1}
          style={{ backgroundColor: "#805E73", height: "300px" }}
        />
        <Parallax.Layer
          offset={2}
          speed={1}
          style={{ backgroundColor: "#87BCDE" }}
        />

        <Parallax.Layer offset={0} speed={0} factor={3} style={someStyle} />

        <Parallax.Layer
          offset={0}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <div style={p1Style.root}>
            <h1>test title</h1>
            <p style={p1Style.text}>
              test text test text test text test text test text test text
            </p>
            <img style={p1Style.image} src={images["bg/man.jpeg"]} />
            <p>{myprop}</p>
            <h1>holy shit</h1>
          </div>
        </Parallax.Layer>

        <Parallax.Layer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </Parallax.Layer>

        <Parallax.Layer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </Parallax.Layer>

        <Parallax.Layer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </Parallax.Layer>

        <Parallax.Layer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "25%", marginLeft: "30%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </Parallax.Layer>

        <Parallax.Layer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
          />
        </Parallax.Layer>

        <Parallax.Layer
          offset={2.5}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none"
          }}
        >
          <img src={url("earth")} style={{ width: "60%" }} />
          <p>{myprop}</p>
        </Parallax.Layer>

        <Parallax.Layer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: url("clients", true)
          }}
        />

        <Parallax.Layer
          offset={0}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        />

        <Parallax.Layer
          offset={1}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        />

        <Parallax.Layer
          offset={2}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => this.parallax.scrollTo(0)}
        />
      </Parallax>
    );
  }
}
