import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import escapeRegExp from "escape-string-regexp"
import Books from './Books'
import * as BooksAPI from '../BooksAPI'
import * as utils from '../utils/CommonUtils'

class SearchBooks extends Component {

    state = {
        query: '',
        shelfOptions: utils.MyBookShelves,
        showingBooks: []
    }

    /**
     * Seacrh books by user input
    **/
    handleChanges = (event) => {
        this.setState({
            query: event.target.value
        }, () => {
            this.handleQueryFilter(this.state.query.trim())
        })
    }

    /*
     ** Find books based on title or Author name
     ** input query from search form
    */
    handleQueryFilter(query) {
        let filteredBooks;
        if (query.length) {
            BooksAPI
                .search(escapeRegExp(query))
                .then(allBooks => {
                    if (!allBooks.hasOwnProperty('error')) {
                        filteredBooks = allBooks.map(book => {
                            book.options = this.state.shelfOptions;
                            this
                                .props
                                .myBooks
                                .map(mybook => {
                                    if (book.id === mybook.id) {
                                        book.shelf = mybook.shelf;
                                    }
                                    return true;
                                });
                            return book;
                        })
                    } else {
                        filteredBooks = [];
                    }
                    this.setState(state => ({showingBooks: filteredBooks}))
                })
        } else {
            this.setState(state => ({showingBooks: []}))
        }
    }

    render() {
        const {handleStatusChange} = this.props;
        const {query} = this.state;

        return (
            <div className="page search-books">
                <div className="search-books-bar">
                    <Link to="./" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={this.handleChanges}/>
                    </div>
                </div>
                <div className="container-fluid">
                    <Books books={this.state.showingBooks} handleStatusChange={handleStatusChange}/>
                </div>
            </div>
        )
    }
}
export default SearchBooks;