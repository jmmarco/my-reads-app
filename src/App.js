import React, { Component } from 'react'
import CurrentlyReading from './CurrentlyReading'
import Read from './Read'
import WantToRead from './WantToRead'
import BookShelf from './BookShelf'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class App extends Component {

  propTypes: {
    books: React.PropTypes.array.isRequired
  }

  state = {
    books: [],
    showSearchPage: false,
    query: '',
    maxResults: 10
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    BooksAPI.search(this.state.query, this.state.maxResults)
    .then((books) => {
      console.log(books)
      console.log(query.trim())
      console.log(typeof books)
      if (typeof books === 'undefined' || books.error) return
      this.setState({books})
    })
    .catch(err => console.log('There was an API error', err))
  }

  render() {
    return (

      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">

                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf books={this.state.books}/>
            </div>
          </div>
        ) : (

          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <CurrentlyReading books={this.state.books.filter(book => book.shelf === 'currentlyReading' )}/>
              <Read books={this.state.books.filter(book => book.shelf === 'read')}/>
              <WantToRead books={this.state.books.filter(book => book.shelf === 'wantToRead' )}/>
            </div>



          </div>



        )}
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default App;
