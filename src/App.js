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
    shelfChangers: utils.ShelveOptions
  }

  componentDidMount() {
    this.getAllBooks();
  } // componentDidMount

  getAllBooks() {
    BooksAPI
      .getAll()
      .then(books => {
        this.groupByCategory(books);
      })
  } // end of getAllBooks

  groupByCategory(allBooks) {
    let bookCategoris = {};
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
  } // end of groupByCategory

  filterBooks(query) {
    console.log(query);
    if (query.length) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState(state => ({
        showingBooks: this
          .state
          .allBooks
          .filter((book) => match.test(book.title))
      }))

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
              shelfChangers={this.state.shelfChangers}
              handleStatusChange={(key, book) => this.handleStatusChange(key, book)}/>
            <Link to="/search" className="open-search"></Link>
          </div>
        )}/>
        <Route
          exact
          path="/search"
          render={(props) => (<SearchBooks
          books={this.state.showingBooks}
          shelfChangers={this.state.shelfChangers}
          handleQueryFilter={(value) => this.filterBooks(value)}
          handleStatusChange={(key, book) => this.handleStatusChange(key, book)}/>)}/>
      </div>
    ); // end of render return
  } // end of render
} // end of App

export default App;
