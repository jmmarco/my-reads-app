import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'

class Book extends Component {

  state = {
    book : null,
    bookId: null,
    shelf: null,
    value: 'none'

  }

  getBook = (bookId) => {
    console.log(bookId)
    BooksAPI.get(bookId)
    .then((book) => {
      // do something
      this.setState({book})
      console.log("State was set")
      console.log(this.state)
    })
    .catch(err => console.log('Something went wrong', err))

  }


  updateBook = (book, shelf) => {

    console.log(book, shelf)

    BooksAPI.update(book, shelf)
    .then((book, shelf) => {
      this.setState({
        book, shelf
      })
    })
    .catch(err => console.log('Something went wrong', err))
  }

  render() {
    const {book} = this.props
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">

          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail })` }}></div>
                <div className="book-shelf-changer">
                  <select value={this.state.value} onChange={(event) => this.updateBook(book ,event.target.value)}>
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

        </ol>

      </div>
    )
  }
}


export default Book
