import React, {Component} from 'react'
import Books from './Books'

class Shelves extends Component {

    render() {
        const {bookCategoris, shelfOptions, handleStatusChange} = this.props;
        return (
            <div className="page">
                {bookCategoris.map((category, index) => (
                    <div className="book-self-section" key={index}>
                        <h1 className="book-self-title">{category.title}</h1>
                        <Books
                            key={index}
                            books={category.books}
                            shelfOptions={shelfOptions}
                            handleStatusChange={handleStatusChange}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default Shelves;