import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI'


class Search extends Component {
  state = {
    query : '',
    placeholder: 'Search by title or author'
  }

  updateQuery = (query)  => {
    this.setState({query: query.trim() })
  }

  handleClick() {
    console.log("It was clicked!")
  }

  render() {

    return(
      <div>
        
        <a onClick={(e) => this.handleClick(e)} />
        <div className="book-top">
          <span className="close-search"/>
          <input className="search-books-bar"
            placeholder={this.state.placeholder}
            type="text"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>

      </div>
    )
  }

}

export default Search
