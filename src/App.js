import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import './App.css'
import PropTypes from 'prop-types'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: false,
      query: '',
      maxResults: 10,
    }
    this.updateBook = this.updateBook.bind(this)
    this.closeSearch = this.closeSearch.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('what are you: ', books)
      this.setState({ books })
    })
  }

  updateBook = (book, value) => {
    console.log('fired')
    BooksAPI.update(book, value).then((response) => {

      const books = this.state.books.map((b) => {
        if(book.id === b.id ) {
          b.shelf = value
        }
        return b
      })
      this.setState({books})
    })

  }


  closeSearch = (e) => {
    console.log('fired!')
    this.setState({ showSearchPage: false })
  }


  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    BooksAPI.search(this.state.query, this.state.maxResults)
    .then((books) => {
      if (typeof books === 'undefined' || books.error) return
      this.setState({books})
    })
    .catch(err => console.log('There was an API error', err))
  }

  render() {
    return (

      <div className="app">
        {this.state.showSearchPage ? (
          <Search books={this.state.books} query={this.state.query} updateBook={this.updateBook} updateQuery={this.updateQuery} closeSearch={this.closeSearch}/>
        ) : (

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



        )}
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

// Moving propTypes outside per: https://facebook.github.io/react/docs/typechecking-with-proptypes.html
App.propTypes = {
  books: PropTypes.array
}

export default App;
