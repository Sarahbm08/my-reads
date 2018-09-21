import React, { Component } from 'react'
import camelcase from 'camelcase'

class Book extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		if(this.props.onShelfChange)
			this.props.onShelfChange(this.props.book, e.target.value)
	}

	displayAuthors = (book) => {
		if(book.authors) //authors exist
			return book.authors.join(", ")
		else
			return ""
	}

	getThumbnail = (book) => {
		if(book.imageLinks) //thumbnail exists
			return book.imageLinks.thumbnail
		else
			return ""
	}

	render() {
		const { book, bookshelves } = this.props
		return (
			<li key={book.id}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							backgroundImage: `url(${this.getThumbnail(book)})`
						}}/>
						<div className="book-shelf-changer">
							<select value={book.shelf} onChange={this.handleSubmit}>
								<option value="move" disabled>Move to...</option>
								{bookshelves.map((bookshelf) => (
									<option value={camelcase(bookshelf)} key={bookshelf}>{bookshelf}</option>
								))}
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{this.displayAuthors(book)}</div>
				</div>
			</li>
		)
	}
}

export default Book