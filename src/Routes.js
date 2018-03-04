import React from "react";
import {Route, Link} from 'react-router-dom'
import MainHeader from "./components/MainHeader"
import Shelves from "./components/BookShelves"
import SearchBooks from "./components/SearchBooks"
const routes = <div className="app">
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
</div>;

export default routes;