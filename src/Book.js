import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'

class Book extends Component {
  state = {
    book: null,
    shelf: '',
    value: 'none'
  }




  componentDidMount() {
    BooksAPI.get(this.props.book.id).then((book) => {
      this.setState({
        book: book,
        shelf: book.shelf,
        value: book.shelf
      })
    })
  }


  updateBook = (event) => {

    BooksAPI.update(this.state.book, event.target.value).then((book) => {
      this.setState((state) => ({
        book: state.book,
        shelf: state.book.shelf,
        value: state.book.shelf
      }))
    })

  }

  handleChange(event) {

    BooksAPI.update(this.state.book, event.target.value).then((book) => {
      console.log(book)
      this.setState({

        value: book.shelf
      })
    }, () => { // Callback to check if the value is set
      console.log('Value is now: ', this.state.value)
       console.log('State is: ', this.state)
    })

    console.log(this.state)

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
                  <select value={this.state.value} onChange={(event) => this.updateBook(event)}>
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
