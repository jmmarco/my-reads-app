import React, { Component } from 'react';
import CurrentlyReading from './CurrentlyReading'
import Search from './Search'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
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
          {/* <WantToRead/> */}
          {/* <Read/> */}
        </div>
        <div className="open-search">
          <Search/>
        </div>
      </div>
    )
  }
}

export default App;
