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
} from '../actions/actionTypes';

const initialState = {
    profile: null,
    loading: true,
    error: {}   
};

export const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case GET_PROFILE:
        case USER_CREATED:
        case UPDATE_USER:
        case DELETE_USER:
            return {
                ...state, 
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
        case USER_CREATED_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state, 
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }
};

