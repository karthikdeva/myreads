import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class SearchBooks extends Component {
    state = {
        query: ''
    }

    render() {
        const {books, shelfChangers, handleStatusChange, handleQueryFilter} = this.props
        const {query} = this.state;

        return (
            <div className="page search-books">

                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.setState({
                            query: event
                                .target
                                .value
                                .trim()
                        }, handleQueryFilter(query))}/>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="card-deck">
                        {books.map((book, i) => (
                            <div key={i} className="card col-2">
                                <img
                                    className="card-img-top mx-auto d-block"
                                    src={book.imageLinks.smallThumbnail}
                                    alt={book.title}/>

                                <div className="card-block">
                                    <h4 className="card-title">
                                        {book.title}</h4>
                                    <p className="card-text">{book.authors}</p>
                                </div>
                                <div className="card-footer text-truncate">
                                    <span className="status-text"></span>
                                    <select
                                        name="selfChanger"
                                        id="selfChanger"
                                        value={book.shelf}
                                        onChange={(e) => handleStatusChange(e.target.value, book)}>
                                        {shelfChangers.map((status, key) => (
                                            <option key={key} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        ))}</div>
                </div>
            </div>
        )
    }

}
export default SearchBooks;