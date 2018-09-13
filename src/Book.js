import React, { Component } from 'react'

class Book extends Component {
	render() {
		const { book } = this.props
		return (
			<li key={book.id}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							backgroundImage: `url(${book.imageLinks.thumbnail})`
						}}/>
					{/* TODO: Change this so when they select something new it updates the state of books */}
						<div className="book-shelf-changer">
							<select>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
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