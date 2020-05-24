import React, { Fragment } from 'react';
import './layout.css';
import image from '../../images/background.png';

const Landing = () => {
    return (
        <Fragment>
        <div className="card cardStyle">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">PJVBank Welcomes you</h5>
                <p className="card-text">Happy to see you!!!</p>
            </div>
        </div>
        </Fragment>
    );
};

export default Landing;