import React, { useState } from 'react';
import {connect} from 'react-redux';
import '../login&Register/loginRegister.css';
import {updateUser} from '../../actions/profileactions';
import { Link } from 'react-router-dom';

const Update = ({isAuthenticated, dispatch, history}) => {
    const [formData, setFormdata] = useState({
        accountNumber: '',
        balance: '',
        accountType: ''
    })
    const {accountNumber, balance, accountType} = formData;
    const onChangeHandle = e => setFormdata({...formData, [e.target.name]:e.target.value});
    const onSubmitHandler = e => {
        dispatch(updateUser(accountNumber, balance, accountType));
        history.push('/dashboard');
    };
    //Redirect to dashboard if authenticated
    // if(isAuthenticated) {
    //     return <Redirect to='/dashboard' />
    // }
    return (
        <div className="loginRegister">
            <h1 className="text-primary">UPDATE USER</h1>
            <div className="input-group flex-nowrap my-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">
                        <svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <input
                    type="number"
                    value={accountNumber}
                    onChange={e => onChangeHandle(e)}
                    name="accountNumber"
                    className="form-control"
                    placeholder="Account Number"
                    aria-label="Account Number"
                    aria-describedby="addon-wrapping"
                />
            </div>
            <div className="input-group flex-nowrap my-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">
                        <svg className="bi bi-eye-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            <path fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <input 
                type="text" 
                value={balance}
                onChange={e => onChangeHandle(e)}
                name="balance"
                className="form-control" 
                placeholder="Balance" 
                aria-label="Balance" 
                aria-describedby="addon-wrapping" 
                />
            </div>
            <div className="input-group flex-nowrap my-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">
                        <svg className="bi bi-eye-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            <path fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <input 
                type="text" 
                value={accountType}
                onChange={e => onChangeHandle(e)}
                name="accountType"
                className="form-control" 
                placeholder="Account Type" 
                aria-label="Account Type" 
                aria-describedby="addon-wrapping" 
                />
            </div>
            <button className="btn btn-primary" onClick={onSubmitHandler}>Update</button>
            <p><Link to='/dashboard'>Cancel</Link></p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Update);