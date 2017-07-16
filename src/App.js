import React, { Component } from 'react';
import logo from './logo.svg';
import CurrentlyReading from './CurrentlyReading'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>Welcome to My Reads App</h1>
        </div>
        <CurrentlyReading/>
      </div>
    );
  }
}

export default App;
