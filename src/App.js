import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import escapeRegExp from "escape-string-regexp"

// Application Css
import './stylesheets/style.css';

// app Components
import MainHeader from "./components/MainHeader"
import Shelves from "./components/BookShelves"
import SearchBooks from "./components/SearchBooks"
import * as BooksAPI from './BooksAPI'
import * as utils from './utils/CommonUtils'

class App extends Component {
  state = {
    allBooks: [],
    showingBooks: [],
    bookCategoris: [],
    shelfOptions: utils.ShelveOptions
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI
      .getAll()
      .then(books => {
        this.groupByCategory(books);
      })

  }

  groupByCategory(allBooks) {
    const bookCategoris = {};
    allBooks.map((book) => {
      if (!bookCategoris.hasOwnProperty(book.shelf)) {
        bookCategoris[book.shelf] = {
          title: utils.camelCaseToSentanceCase(book.shelf),
          books: [book]
        }
      } else {
        bookCategoris[book.shelf]
          .books
          .push(book);
      }
      return bookCategoris
    });

    // converting key-value pair objects to book shelves array
    let bookShelves = [];
    for (let shelf of Object.keys(bookCategoris)) {
      bookShelves.push(bookCategoris[shelf]);
    } // end of for loop

    this.setState(state => ({allBooks: allBooks, bookCategoris: bookShelves}))
  }

  /*
    ** Find books based on title or Author name
    ** query
  */

  filterBooks(query) {
    if (query.length) {
      // const match = new RegExp(escapeRegExp(query), 'i');
      BooksAPI
        .search(escapeRegExp(query))
        .then(allBooks => {
          console.log(allBooks);
          let filterdBooks = allBooks.hasOwnProperty('error')
            ? []
            : allBooks;
          this.setState(state => ({showingBooks: filterdBooks}))

        })
      // this .state .allBooks .filter((book) => match.test(book.title) &&
      // this.state.shelfOptions.filter(shelf => shelf.value === book.shelf))

    } else {
      this.setState(state => ({showingBooks: []}))
    }
  }

  handleStatusChange = ((shelf, book) => {
    BooksAPI
      .update(book, shelf)
      .then(books => {
        this.getAllBooks();
      })
  }); // end of handleStatusChange

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={(props) => (
          <div className="container-fluid">
            <MainHeader/>
            <Shelves
              bookCategoris={this.state.bookCategoris}
              shelfOptions={this.state.shelfOptions}
              handleStatusChange={(key, book) => this.handleStatusChange(key, book)}/>
            <Link to="/search" className="open-search"></Link>
          </div>
        )}/>
        <Route
          exact
          path="/search"
          render={({
          history
        }, props) => (<SearchBooks
          history={history}
          books={this.state.showingBooks}
          shelfOptions={this.state.shelfOptions}
          handleQueryFilter={(value) => this.filterBooks(value)}
          handleStatusChange={(key, book) => this.handleStatusChange(key, book)}/>)}/>
      </div>
    );
  }
}

export default App;
