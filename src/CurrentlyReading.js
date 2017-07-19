import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'


class CurrentlyReading extends Component {

  render() {
    // console.log(this.props)
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <BookGrid books={this.props.books}/>
        </div>
      </div>
    )
  }
}

export default CurrentlyReading
