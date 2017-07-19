import React, { Component } from 'react'

class CurrentlyReading extends Component {

  render() {

    console.log('Props', this.props);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ul className="books-grid">

            {this.props.books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-cover book-top" style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}>


                    <div className="book-shelf-changer">
                      <select onClick={() => this.props.onRemoveBook(book)}>
                        <option value="">Currently Reading</option>
                        <option value="">Want to Read</option>
                        <option value="">Read</option>
                      </select>
                    </div>


                  </div>

                  <h3 className="book-title">{book.title}</h3>
                  <h4 className="book-authors">{book.authors}</h4>
                </div>
              </li>
            ))}



          </ul>
        </div>
      </div>
    )
  }
}

export default CurrentlyReading
