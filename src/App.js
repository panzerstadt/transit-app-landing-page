import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Parallax from "./components/parallax";
import Scroll from "./components/scroll";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Scroll />
      </div>
    );
  }
}

export default App;
