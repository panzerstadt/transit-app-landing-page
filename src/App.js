import React, { Component } from "react";
import LoginPage from "./components/Login";

// import logo from "./logo.svg";
import "./App.css";

// import Parallax from "./components/parallax";
import Scroll from "./components/scroll";
// import Header from "./components/header";

// debug turns off authentication
const debug = true;

class App extends Component {
  state = {
    isLoggedIn: false
  };
  handleAuthentication = this.handleAuthentication.bind(this);

  handleAuthentication(e) {
    // call Handle Submit here?
    if (e === true) {
      console.debug("authenticated");
      this.setState({ isLoggedIn: true });
    } else {
      console.error("authentication failed");
    }
  }

  componentDidMount() {
    if (debug) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        {this.state.isLoggedIn ? (
          <Scroll />
        ) : (
          <LoginPage isAuthenticated={this.handleAuthentication} />
        )}
      </div>
    );
  }
}

export default App;
