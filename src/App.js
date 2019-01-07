import React, { Component } from "react";
import LoginPage from "./components/Login";

// import logo from "./logo.svg";
import "./App.css";

// import Parallax from "./components/parallax";
import Scroll from "./components/scroll";
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyBr0sQMjen3zRkUG4slJUh301VH0aDkTRY",
  authDomain: "intransit-54f16.firebaseapp.com",
  databaseURL: "https://intransit-54f16.firebaseio.com",
  projectId: "intransit-54f16",
  storageBucket: "intransit-54f16.appspot.com",
  messagingSenderId: "486632746677"
};
firebase.initializeApp(config);

// import Header from "./components/header";

// simple password protection here

class App extends Component {
  state = {
    isLoggedIn: true
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
