import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


class Search extends Component {

  searchStuff(query) {
    this.props.updateQuery(query)
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={(event) => this.searchStuff(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            books={this.props.books}
            updateBook={this.props.updateBook}
          />
        </div>
      </div>
    )
  }
}

export default Search
