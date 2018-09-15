import React, { Component } from 'react'
import camelcase from 'camelcase'

class Book extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		if(this.props.onShelfChange)
			this.props.onShelfChange(this.props.book, e.target.value)
	}

	render() {
		const { book, bookshelves } = this.props
		return (
			<li key={book.id}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							backgroundImage: `url(${book.imageLinks.thumbnail})`
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
					<div className="book-authors">{book.authors[0]}</div>
				</div>
			</li>
		)
	}
}

export default Book