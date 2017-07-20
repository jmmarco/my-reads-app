import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class CurrentlyReading extends Component {

  render() {

    console.log('Props', this.props);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <Book/>
      </div>
    )
  }
}

CurrentlyReading.propTypes = {
  books: PropTypes.array.isRequired
}

export default CurrentlyReading
