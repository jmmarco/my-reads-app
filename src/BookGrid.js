import React, { Component } from 'react'

class BookGrid extends Component {
  render() {
    return (
      <ul className="books-grid">
        <li>
          <div className="book">
            <h3 className="book-title"></h3>
            <h4 className="book-authors"></h4>
          </div>
        </li>
      </ul>
    )
  }
}

export default BookGrid
