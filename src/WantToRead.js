import React, { Component } from 'react'
import BookGrid from './BookGrid'

class WantToRead extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          {/* <BookGrid/> */}
        </div>
      </div>
    )
  }
}

export default WantToRead
