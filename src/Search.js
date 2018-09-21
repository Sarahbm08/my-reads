import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
	state = {
		query: "",
		booksFound: []
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
		this.searchBooks(query)
	}

	updateBooksFound = (newBooksFound) => {
		this.setState({ booksFound: newBooksFound })
	}

	searchBooks = (query) => {
		if(query) { // something has been typed
			BooksAPI.search(query).then((newBooksFound) => {
				if(newBooksFound.error) {
					newBooksFound = [];
				}
	      this.updateBooksFound(newBooksFound)
	    })
		}
		else {
			this.updateBooksFound( [] )
		}
	}

	render() {
		const { bookshelves, onShelfChange } = this.props
		const { query, booksFound } = this.state
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {
            /*
							TODO:
								- if book is on shelf already, that shelf should be selected on the search page
								- accept multiple words delimited by spaces for search
								- sync books state more with BooksAPI?
								- invalid queries are handled ... ?
								- add books to shelves when a shelf is selected from search page
								- create README

              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
            	type="text"
            	placeholder="Search by title or author"
            	value={query}
            	onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
						{booksFound.map((book) =>
							<Book
								book={book}
								bookshelves={bookshelves}
								onShelfChange={onShelfChange}
								key={book.id}
							/>
						)}
          </ol>
        </div>
      </div>
		)
		
	}
}

export default Search