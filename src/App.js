import React, { Component } from 'react';
import './App.css';
import NavBar from "./feature/navbar/component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="jumbotron App-header">
          <h2>Fun With URLs</h2>
        </div>
        <NavBar />
        <div className="App-main">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
