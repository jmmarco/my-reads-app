import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import PropTypes from 'prop-types'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: false,
      query: '',
      maxResults: 10,
      searchResults: []
    }
    this.updateBook = this.updateBook.bind(this)
    // this.closeSearch = this.closeSearch.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((response) => {

      //  Map the books array
      let books = this.state.books.map((b) => {
        if(book.id === b.id ) {
          b.shelf = newShelf
        }
        return b
      })

      // Map the Search results books array
      let searchedBooks = this.state.searchResults.map((b) => {
        if (book.id === b.id) {
          b.shelf = newShelf
        }
        return b
      })

      // Concat both arrays
      let results = books.concat(searchedBooks)

      // Filter out duplicates
      results = results.filter((b, pos, self) => {
        return self.indexOf(b) === pos
      })

      // Set the state
      this.setState({books: results})
    })

  }

  // closeSearch = (e) => {
  //   console.log('fired!')
  //   this.setState({ showSearchPage: false })
  // }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    BooksAPI.search(this.state.query, this.state.maxResults)
    .then((books) => {
      if (typeof books === 'undefined' || books.error) return
      this.setState({
        searchResults: books
      })
    })
    .catch(err => console.log('There was an API error', err))
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (
          <Search
            books={this.state.searchResults}
            query={this.state.query}
            updateBook={this.updateBook} updateQuery={this.updateQuery}
            closeSearch={this.closeSearch}
          />
        )}/>

        <Route path="/" exact render={() => (
          <div>
            <div className="list-books">

              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                <BookShelf
                  title={"Currently Reading"}
                  books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                  updateBook={this.updateBook}
                />
                <BookShelf
                  title={"Read"}
                  books={this.state.books.filter(book => book.shelf === 'read')}
                  updateBook={this.updateBook}
                />
                <BookShelf
                  title={"Want to Read"}
                  books={this.state.books.filter(book => book.shelf === 'wantToRead' )}
                  updateBook={this.updateBook}
                />
              </div>
            </div>

            <div className="open-search">
              <Link  to="/search" >Add a book</Link>
            </div>
          </div>
            )}/>

      </div>
    )
  }
}

// Moving propTypes outside per: https://facebook.github.io/react/docs/typechecking-with-proptypes.html
App.propTypes = {
  books: PropTypes.array
}

export default App;
