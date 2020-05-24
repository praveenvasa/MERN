import {
    GET_PROFILE,
    PROFILE_ERROR,
    USER_CREATED,
    USER_CREATED_FAIL,
    UPDATE_USER,
    UPDATE_USER_FAIL,
    DELETE_USER,
    DELETE_USER_FAIL,
    CLEAR_PROFILE
} from './actionTypes';
import axios from 'axios';
import { setAlert } from './alertactions';

export const getCurrentProfile = (url) => async (dispatch, getState) => {
    console.log('current state',getState().auth);
    try {
        const res = await axios.get(url);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        const msg = error.response && error.response.data.msg;
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: msg, status: error.response && error.response.status }
        });
        if (msg) {
            dispatch(setAlert(msg, 'info'));
        }
    }
};

//Create User
export const createUser = (email, name, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, name, password });
    try {
        const res = await axios.post('/api/profile', body, config);
        dispatch({
            type: USER_CREATED,
            payload: res.data
        })
        dispatch(setAlert('User Created Successfully', 'success'))
    } catch (error) {
        const errors = error.response && error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: USER_CREATED_FAIL
        })

    }
};

//Update User
export const updateUser = (accountNumber, balance, accountType) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ accountNumber, balance, accountType });
    try {
        const res = await axios.post('/api/profile', body, config);
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        dispatch(setAlert('User Updated Successfully', 'success'))
    } catch (error) {
        const errors = error.response && error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: UPDATE_USER_FAIL
        })

    }
};

//Delete User
export const deleteUser = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: res.data
        })
        dispatch(setAlert('User Deleted Successfully', 'success'))
    } catch (error) {
        const errors = error.response && error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: DELETE_USER_FAIL
        })

    }
};

//clear profile
export const clearProfile = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })

};