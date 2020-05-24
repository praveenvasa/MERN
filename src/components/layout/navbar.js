import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authactions'

const Navbar = ({ auth: { isAuthenticated, loading }, dispatch }) => {
    const authLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item nav-link"><Link onClick={() => dispatch(logout())} to='/'><span className="fa fa-sign-out" aria-hidden="true" />Logout</Link></li>
        </ul>
    );
    const guestLinks = (
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item nav-link"><Link to='/login'><span className="fa fa-sign-in" aria-hidden="true" />Login</Link></li>
            <li className="nav-item nav-link"><Link to='/register'><span className="fa fa-handshake-o" aria-hidden="true" />Register</Link></li>
        </ul>
    )
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-inverse bg-dark">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">PJVBank</Link>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link"><Link to="#"><i className="fa fa-instagram" aria-hidden="true" /></Link></li>
                        <li className="nav-item nav-link"><Link to="#"><i className="fa fa-google-plus" aria-hidden="true" /></Link></li>
                        <li className="nav-item nav-link"><Link to="#"><i className="fa fa-pinterest" aria-hidden="true" /></Link></li>
                        <li className="nav-item nav-link"><Link to="#"><i className="fa fa-twitter" aria-hidden="true" /></Link></li>
                        <li className="nav-item nav-link"><Link to="#"><i className="fa fa-facebook-official" aria-hidden="true" /></Link></li>
                        <li className="nav-item nav-link"><Link to="#"><i className="fa fa-youtube-play" aria-hidden="true" /></Link></li>
                    </ul>
                </div>
                {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
            </nav>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navbar);