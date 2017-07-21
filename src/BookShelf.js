import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {

  render() {
    const {books} = this.props;
    // console.log('Props: ', this.props)

    // This is much cleaner approach
    const mappedBooks = books.map((book, i) => {
      return <Book book={book} key={i}/>
    })

    return (

      <div className="bookshelf-books">
        <ol className="books-grid">
          {mappedBooks}
        </ol>
      </div>

    )
  }

}

export default BookShelf
