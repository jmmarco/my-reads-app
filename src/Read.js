import React, { Component } from 'react'
import BookGrid from './BookGrid'

class Read extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <BookGrid/>
        </div>
      </div>
    )
  }
}

export default Read
