import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'


class CurrentlyReading extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { books } = this.props
    let showingBooks
    console.log(books)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <BookGrid/>
        </div>
      </div>
    )
  }
}

export default CurrentlyReading
