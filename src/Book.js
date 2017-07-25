import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'

class Book extends Component {

  componentDidMount() {
    BooksAPI.get(this.props.book.id).then((book) => {
      this.setState({
        book: book,
        shelf: book.shelf,
        value: book.shelf
      })
    })
  }



  handleChange(e) {
    console.log("WWWWHHWHWHWHW")
    // this.props.updateBook(e.target.value)
  }





    // console.log(this.state)
    // console.log(this.props)
    // this.setState({
    //   book: this.props.book,
    //   value: event.target.value,
    // }, () => { // Callback to check if the value is set
    //   console.log('Value is now: ', this.state.value)
    //   console.log('State is: ', this.state)
    // })
    //
    // console.log(this.state)

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
                  <select value={book.shelf} onChange={(event) => this.handleChange(event)}>
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
