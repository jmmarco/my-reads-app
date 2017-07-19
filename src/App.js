import React, { Component } from 'react';
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class App extends Component {

  state = {
    books: []
  }


  // Add lifecycle event
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>Welcome to My Reads App</h1>
        </div>
        <div className="list-books-content">
          <CurrentlyReading books={this.state.books} />
          {/* <WantToRead/>
          <Read/> */}
        </div>
      </div>
    );
  }
}

export default App;
