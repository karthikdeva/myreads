import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'

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
    myBooks: [],
    myBookShelves: [],
    shelfOptions: utils.MyBookShelves
  }

  componentDidMount() {
    this.getAllMyBooks();
  }

  getAllMyBooks() {
    BooksAPI
      .getAll()
      .then(books => {
        this.groupByCategory(books);
      })

  }

  //Group the book by it shelf status
  groupByCategory(myBooks, selectedBook = {}, selectedShelf = '') {
    const myBookShelves = {};
    myBooks.filter((book) => {
      book.options = this.state.shelfOptions;

      if (selectedBook.id === book.id) {
        book.shelf = selectedShelf;
      }
      if (!myBookShelves.hasOwnProperty(book.shelf)) {
        myBookShelves[book.shelf] = {
          title: utils.camelCaseToSentanceCase(book.shelf),
          id: book.shelf,
          books: [book]
        }
      } else {
        myBookShelves[book.shelf]
          .books
          .push(book);
      }
      return myBookShelves
    });

    // converting key-value pair objects to book shelves array
    let bookShelves = [];
    for (let shelf of Object.keys(myBookShelves)) {
      bookShelves.push(myBookShelves[shelf]);
    }

    this.setState(state => ({myBooks: myBooks, myBookShelves: bookShelves}))
  }

  handleStatusChange = ((shelf, book) => {
    BooksAPI
      .update(book, shelf)
      .then(books => {
        this.groupByCategory(this.state.myBooks, book, shelf);
      })
  }); // end of handleStatusChange


  /*
   I tried extacting the routes in a separate file. but i couldn't do that
   Need help on extarcting routes in a separate file.
  */

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
              myBookShelves={this.state.myBookShelves}
              myBooks={this.state.myBooks}
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
          myBooks={this.state.myBooks}
          handleStatusChange={(key, book) => this.handleStatusChange(key, book)}/>)}/>
      </div>
    );
  }
}

export default App;
