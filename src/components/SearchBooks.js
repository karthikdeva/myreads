import React, {Component} from 'react';
// import {Link} from 'react-router-dom'
import Books from './Books'

class SearchBooks extends Component {

    state = {
        query: ''
    }

    handleChanges = (event) => {
        this.setState({
            query: event.target.value
        }, () => {
            this
                .props
                .handleQueryFilter(this.state.query.trim())
        })
    }
    handleBackNavigation = () => {
        this
            .props
            .handleQueryFilter('');
        this
            .props
            .history
            .push('./');
    }

    render() {
        const {books, shelfOptions, handleStatusChange} = this.props;
        const {query} = this.state;

        return (
            <div className="page search-books">
                <div className="search-books-bar">
                    <button onClick={this.handleBackNavigation} className="close-search">Close</button>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={this.handleChanges}/>
                    </div>
                </div>
                <div className="container-fluid">
                    <Books
                        books={books}
                        shelfOptions={shelfOptions}
                        handleStatusChange={handleStatusChange}/>
                </div>
            </div>
        )
    }

}
export default SearchBooks;