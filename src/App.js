import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Parallax from "./components/parallax"

class App extends Component {
  render() {
    return (
      <div className="App">
      <Parallax />
      </div>
    );
  }
}

export default App;
