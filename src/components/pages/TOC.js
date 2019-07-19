import React, { Component } from "react";
import Radium from "radium";

const TOC = (
  <div>
    <p>Version 1.0 posted and effective as of March 1st, 2019.</p>
    <p>
      PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THE SERVICES OFFERED
      BY INTRANSIT APP. BY ACCESSING OR USING THE SERVICE YOU AGREE TO BE BOUND
      BY THESE TERMS. IF YOU DISAGREE WITH ANY PART OF THE TERMS THEN YOU MAY
      NOT ACCESS THE SERVICE.
    </p>
    <p>
      Background
      <br />
      The InTransit App operates and offers flight scheduling and planning based
      on FlightStats Service.
    </p>
    <p>
      Changes to the Terms and Conditions
      <br />
      We may amend any part of these Terms by adding, deleting, or varying their
      content. These amendments may be made at any time and from time-to-time in
      our discretion, and could occur very close together, or very far apart,
      depending on the circumstances. We will provide you with notice of the
      proposed amendment by posting an amended version of these Terms with a new
      version number. We will include a link to the previous version of the
      terms beneath the new version number. If you disagree with any amendments,
      you may terminate these Terms by uninstalling the App. If you do not
      uninstall the App and cease using the Services during that time, then by
      your continued use, you are considered to have accepted the proposed
      amendments. Additionally, if you reinstall the App or begin using the
      Services again, you are considered to have accepted the amendments then in
      effect.
    </p>
    <p>
      General Condition
      <br />
      To enhance the experience the App may request access to the phone calendar
      and user's location. Any data requested by the App will be stored using
      the AsyncStorage.
    </p>
    <p>
      We do not collect any user's data unless is anonymized, aggregated or
      pseudonymized.
    </p>
    <p>
      InTransit provides flight information based on FlightStats Services and
      various sources and can only control the ability to receive data from
      these sources.
    </p>
    <p>
      We make no guarantee or warranty as to the accuracy, performance, or
      availability of the data we publish.
    </p>
    <p>
      We are not responsible for any losses caused by Data or App inaccuracies,
      failure, or bugs.
    </p>
    <p>
      The content, mechanics, data sources, and/or design of the App may change
      at any time to enhance the user's experience.
    </p>
    <p>
      Termination
      <br />
      We may terminate or suspend access to our Service immediately, without
      prior notice or liability, for any reason whatsoever, including without
      limitation if you breach the Terms.
    </p>
    <p>
      All provisions of the Terms which by their nature should survive
      termination shall survive termination, including, without limitation,
      ownership provisions, warranty disclaimers, indemnity and limitations of
      liability.
    </p>
  </div>
);

const style = {
  button: {
    root: {
      textAlign: "center",
      zIndex: 1000,
      position: "absolute",
      width: "100%",
      top: -70,
      height: 0
    },
    bar: {
      backgroundColor: "transparent",
      border: "none",
      minHeight: 6,
      padding: 10,
      margin: 0,
      fontSize: 15,
      fontWeight: 300,
      color: "lightgrey",
      outline: "none",
      ":hover": {
        textDecoration: "underline"
      }
    }
  }
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
    const path = window.location.hash.slice(1);
    if (path === "terms-and-conditions" && !this.state.showPage4) {
      this.setState({ showPage4: true });
      setTimeout(() => {
        this.scrollSlowly("down");
      }, 300);
    }
    console.log(path);
    refOffsetY = this.refLocation.map(r => {
      if (r.current) {
        return r.current.offsetTop;
      } else {
        return null;
      }
    });
  }

  render() {
    return (
      <div
        ref={this.refLocation[0]}
        style={{
          backgroundColor: "#011627",
          color: "white",
          textAlign: "left",
          fontWeight: 300,
          position: "relative"
        }}
      >
        <div
          id="terms-and-conditions"
          className="about-btn"
          style={style.button.root}
        >
          <button style={style.button.bar} onClick={this.handleClick}>
            Terms and Conditions
          </button>
        </div>
        <div
          style={{
            display: this.state.showPage4 ? "flex" : "none",
            padding: "0 20px",
            margin: "3rem auto",
            maxWidth: 600,
            fontSize: "0.9rem"
          }}
        >
          {TOC}
        </div>
      </div>
    );
  }
}

export default Radium(Page);
