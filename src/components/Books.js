import React, {Component} from "react";
import * as utils from '../utils/CommonUtils'

class Books extends Component {
    render() {
        const noImage = utils.noImage;
        const {books, handleStatusChange} = this.props;
        return (
            <div className="row">
                {books.map((book) => (
                    <div key={book.id} className="col-3 col-md-2 col-sm-4">
                        <div className="card">
                            <img
                                className="card-img-top mx-auto d-block"
                                src={book.imageLinks
                                ? book.imageLinks.smallThumbnail
                                : noImage}
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

                                    {book
                                        .options
                                        .map((status, key) => (
                                            <option key={key} value={status.value}>{status.label}</option>
                                        ))
}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}
export default Books;