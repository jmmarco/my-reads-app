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
      query: '',
      maxResults: 10,
      searchResults: []
    }
    this.updateBook = this.updateBook.bind(this)
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
      const books = this.state.books.map((b) => {
        if(b.id === book.id) {
          b.shelf = newShelf
        }
        return b
      })

      this.setState({books: books})


      // Map the Search results books array
      const searchedBooks = this.state.searchResults.map((b) => {
        if (b.id === book.id) {
          b.shelf = newShelf
        }
        return b
      })


      this.setState({searchResults: searchedBooks})



      const singleBook = searchedBooks.filter((b) => {
        return b.id === book.id
      })

      const bothArrays = books.concat(singleBook)

      const uniqueArray = bothArrays.filter(function(item, pos) {
        return bothArrays.indexOf(item) === pos;
      })

      this.setState({books: uniqueArray})

    })

    // This `updateBook` function can be improved. For example: I don't
    // think I need to set the state so frequently.


  }

  updateQuery = (query) => {
    // Set state and trim whitespace
    this.setState({ query: query.trim() })

    // Call the search API
    if (query !== '') {
      BooksAPI.search(this.state.query, this.state.maxResults)
      .then((books) => {
        if (typeof books === 'undefined' || books.error) return
        this.setState({
          searchResults: books
        })
      })
      .catch(err => console.log('There was an API error', err))
    }

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
              <Link  to="/search">Add a book</Link>
            </div>
          </div>
            )}/>

      </div>
    )
  }
}

// Moving propTypes outside per: https://facebook.github.io/react/docs/typechecking-with-proptypes.html
App.propTypes = {
  books: PropTypes.array,
  query: PropTypes.string,
  maxResults: PropTypes.number,
  searchResults: PropTypes.array,
  updateBook: PropTypes.func,
  updateQuery: PropTypes.func
}

export default App;
