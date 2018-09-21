import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
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
    this.setBooksFromAPI();
  }

  setBooksFromAPI() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf(bookToChange, newShelf) {
    BooksAPI.update(bookToChange, newShelf)
    this.setBooksFromAPI()
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
