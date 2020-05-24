import React, {useState} from 'react';
import {connect} from 'react-redux';
import './loginRegister.css';
import { Link, Redirect } from 'react-router-dom';
import {login} from '../../actions/authactions';

const Login = ({dispatch, isAuthenticated}) => {
    const [formData, setFormdata] = useState({
        email:'',
        password:''  
    })
    const {email, password} = formData;
    const onChangeHandle = e => setFormdata({...formData, [e.target.name]:e.target.value});
    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    //Redirect to dashboard if authenticated
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <div className="loginRegister">
            <h1 className="text-primary">LOGIN</h1>
            <div className="input-group flex-nowrap">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">
                        <svg className="bi bi-envelope-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0014 2H2A2 2 0 00.05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108L9.157 8.879 8 9.586l-1.157-.707-6.675 3.926A2 2 0 002 14h12a2 2 0 001.832-1.195zM0 11.743l5.875-3.456L0 4.697v7.046z" />
                        </svg>
                    </span>
                </div>
                <input 
                type="email" 
                value={email}
                onChange={e => onChangeHandle(e)}
                name="email"
                className="form-control" 
                placeholder="Email" 
                aria-label="Email" 
                aria-describedby="addon-wrapping" 
                required
                />
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">@example.com</span>
                </div>
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
                    type="password"
                    value={password}
                    onChange={e => onChangeHandle(e)}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="addon-wrapping"
                    required
                />
            </div>
            <button className="btn btn-primary" onClick={onSubmitHandler}>Login</button>
            <p>Don't Have an Account? <Link to='/register'>Register</Link></p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Login);