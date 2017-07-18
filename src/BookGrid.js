import React, { Component } from 'react'


class BookGrid extends Component {
  render() {
    const {books} = this.props
    return (
      <ul className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book" style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
              <h3 className="book-title">{book.title}</h3>
              <h4 className="book-authors">}{book.authors[0]}</h4>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default BookGrid
