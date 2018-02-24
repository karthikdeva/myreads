import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class MainHeader extends Component {

    render() {
        let brandName = "My Reads";
        return (
            <header className="navbar navbar-dark fixed-top">
                <Link className="navbar-brand" to="/">{brandName}</Link>
            </header>
        )
    }

}
export default MainHeader;