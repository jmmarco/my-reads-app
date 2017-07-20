import React, { Component } from 'react'
import Book from './Book'

class WantToRead extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <Book/>
      </div>
    )
  }
}

export default WantToRead
