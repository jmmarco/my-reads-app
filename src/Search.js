import React, { Component } from 'react'
import BookShelf from './BookShelf'


class Search extends Component {

  searchStuff(query) {
    this.props.updateQuery(query)
  }

  closeSearch(e) {
    console.log("Closing Search")
    console.log("Event is", e)
    this.props.closeSearch()
  }


  render() {
    const {updateQuery} = this.props
    console.log(this.props)
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={(e) => this.closeSearch(e)}>Close</a>
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
              value={this.props.query}
              onChange={(event) => this.searchStuff(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BookShelf books={this.props.books} updateBook={this.updateBook}/>
        </div>
      </div>
    )
  }
}

export default Search
