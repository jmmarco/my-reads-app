import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {

  render() {
    console.log('fired')
    console.log(this.props.searchResults)
    const {books, updateBook} = this.props
    // console.log('Props: ', this.props)

    // This is much cleaner approach
    const mappedBooks = books.map((book, i) => {
      return <Book book={book} key={i} updateBook={this.props.updateBook} />
    })

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {mappedBooks}
          </ol>
        </div>
      </div>

    )
  }

}

export default BookShelf
