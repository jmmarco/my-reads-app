import React, { Component } from 'react'
import BookShelf from './BookShelf'

class CurrentlyReading extends Component {
  render() {
    const {books} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <BookShelf books={books}/>
      </div>
    )
  }
}


export default CurrentlyReading
