import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './utils/BooksAPI'
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
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('what are you: ', books)
      this.setState({ books })
    })
  }

  updateBook = (book, value) => {
    console.log("fired")
    BooksAPI.update(book, value).then((book) => {


      const books = this.state.books.filter((b, i) => {
         if(b.shelf !== value) {
           return b
         }
      })


      console.log(books)

      this.setState({books});
    })
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
