import React, { Component } from 'react'
import BookShelf from './BookShelf'

class Read extends Component {
  render() {
    const {books} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <BookShelf books={books}/>
      </div>
    )
  }
}

export default Read
