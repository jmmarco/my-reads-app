import React, { Component } from 'react';
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>Welcome to My Reads App</h1>
        </div>
        <div className="list-books-content">
          <CurrentlyReading/>
          <WantToRead/>
          <Read/>
        </div>
      </div>
    );
  }
}

export default App;
