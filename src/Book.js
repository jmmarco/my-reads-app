import React, { Component } from 'react'

class Book extends Component {

  updateBook = (book, newShelf) => {
    this.props.updateBook(book, newShelf)
  }

  render() {
    const {book, updateBook} = this.props
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail })` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf || 'none'} onChange={(event) => updateBook(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors !== undefined && book.authors.length > 1 ? book.authors.map((a) => `${a} `) : book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
