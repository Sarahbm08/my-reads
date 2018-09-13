import React, { Component } from 'react'
import Book from './Book'
import camelcase from 'camelcase'

class ListBooks extends Component {
	
	// returns an array of books on the given shelf
	// expects shelf to be not in camel case
	getBooksFromShelf(shelf) {
		return this.props.books.filter((book) => book.shelf === camelcase(shelf))
	}

	render() {
		const bookshelves = ["Currently Reading",
												 "Want to Read", 
												 "Read"]

		return (
			<div className="list-books">
				<div className="list-books-title">
						<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>

						{bookshelves.map((bookshelf) => (
							<div className="bookshelf" key={bookshelf}>
								<h2 className="bookshelf-title">{bookshelf}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">																			
										{this.getBooksFromShelf(bookshelf).map((book) => (
											<Book book={book} />
										))}
									</ol>
								</div>
							</div>
						))}
						
					</div>
				</div>
			</div>

		)
	}
}

export default ListBooks