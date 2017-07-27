import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: false,
      query: '',
      maxResults: 10,
      searchedBooks: []
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

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if (query.trim() !== '') {
      BooksAPI.search(query, this.state.maxResults)
      .then((response) => {
        if (typeof response === 'undefined' || response.error) return
        this.setState({searchedBooks: response})
      })
      .catch(err => console.log('There was an API error', err))
    } else {
      // Clear the books array since no search terms were entered
      this.setState({searchedBooks:[]})
    }


  }


  // updateQuery = query => {
  //   this.setState({ query: query.trim() })
  //
  //   if (query.trim() !== '') {
  //     BooksAPI.search(this.state.query, 5).then( searchResult => (
  //       this.setState({books: searchResult})
  //     ))
  //   }
  //   console.log(this.state.searchResult)
  // }

  render() {


    return (

      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={() => this.setState({ showSearchPage: false, books: this.state.books }, console.log("hi this.state.books is: ", this.state.books))}>Close</Link>
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
              <BookShelf books={this.state.searchedBooks} updateBook={this.updateBook}/>
            </div>
          </div>
        ) : (

          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>


            <Route path="/" exact
              render={() => (
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
              )}>
            </Route>



          </div>



        )}
        <div className="open-search">
          <Link to="/search" onClick={() => this.setState({ showSearchPage: true})}>Search book</Link>
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
