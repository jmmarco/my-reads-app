import React, { Component } from 'react'
import BookShelf from './BookShelf'

class WantToRead extends Component {
  render() {
    const {books} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <BookShelf books={books}/>
      </div>
    )
  }
}

export default WantToRead
