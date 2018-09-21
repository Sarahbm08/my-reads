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
		this.setState({ query: query })
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

	findBookInShelves = (books, book) => {
		const index = books.findIndex((b) => book.id === b.id)
		return index === -1 ? book : books[index]
	}

	render() {
		const { books, bookshelves, onShelfChange } = this.props
		const { query, booksFound } = this.state
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
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
								book={this.findBookInShelves(books, book)}
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