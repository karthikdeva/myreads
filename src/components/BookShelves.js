import React, {Component} from 'react'

class Shelves extends Component {

    render() {
        const {bookCategoris, shelfChangers, handleStatusChange} = this.props;
        return (
            <div className="page">
                {bookCategoris.map((category, index) => (
                    <div className="book-self-section" key={index}>
                        <h1 className="book-self-title">{category.title}</h1>
                        <div className="card-deck">
                            {category
                                .books
                                .map((book, i) => (
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
                ))}
            </div>
        )
    }
}

export default Shelves;