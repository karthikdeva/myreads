import React, {Component} from 'react'
import Books from './Books'

class Shelves extends Component {

    render() {
        const {myBookShelves, handleStatusChange} = this.props;
        return (
            <div className="page">
                {myBookShelves.map((shelve) => (
                    <div className="book-self-section" key={shelve.id}>
                        <h1 className="book-self-title">{shelve.title}</h1>
                        <Books books={shelve.books} handleStatusChange={handleStatusChange}/>
                    </div>
                ))}

            </div>
        )
    }
}

export default Shelves;
