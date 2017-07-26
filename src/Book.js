import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'

class Book extends Component {


  render() {
    console.log(this.props)
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
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}


export default Book
