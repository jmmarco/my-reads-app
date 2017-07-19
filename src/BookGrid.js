import React, { Component } from 'react'

class BookGrid extends Component {


  render() {
    const books = this.props.books

    // let books = this.props
    console.log("Props", books);

    console.log("props from BookGrid: ", this.props)
    return (
      // <ul className="books-grid">
      //   {books.map((book) => (
      //     <li key={book.id} className="book-top">
      //       <div className="book">
      //         <h3 className="book-title">{book.title}</h3>
      //         <h4 className="book-authors">{book.authors}</h4>
      //       </div>
      //     </li>
      //   ))}
      // </ul>
      <div>
        hello there
      </div>
    )
  }
}

export default BookGrid
