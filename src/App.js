import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // load all the books into the books in our state
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf(bookToChange, newShelf) {
    bookToChange.shelf = newShelf

    // we need to add a new book
    if(this.state.books.every((b) => b.id !== bookToChange.id)) { 
      this.setState((state) => ({
        books: state.books.concat(bookToChange)
      }))
    }
    else {
       // update one book in our books array
      this.setState((state) => ({
        books: state.books.map((b) => b.id === bookToChange.id ? bookToChange : b)
      }))
    }

   

    BooksAPI.update(bookToChange, newShelf)
  }

  render() {
    const bookshelves = ["Currently Reading",
                   "Want to Read", 
                   "Read"]

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <ListBooks
              books={this.state.books}
              bookshelves={bookshelves}
              onShelfChange={(book, newShelf) => {
                this.changeShelf(book, newShelf)
              }}
            />

            <Link 
              to="/search"
              className="open-search"
            >Add a book</Link>
          </div>
        )}/>        

        <Route path="/search" render={() => (
          <Search
            books={this.state.books}
            bookshelves={bookshelves}
            onShelfChange={(book, newShelf) => {
               this.changeShelf(book, newShelf)
            }}
          />
        )}/>       

      </div>
    )
  }
}

export default BooksApp
