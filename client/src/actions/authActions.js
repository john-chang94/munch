import axios from 'axios';

const token = sessionStorage.getItem('token');
if (token) {
    // Set global headers for axios, need to set in other parents components
    const tokenConfig = { 'token': token }
    axios.defaults.headers = tokenConfig
}

export const clear = () => {
    return dispatch => {
        dispatch({ type: 'CLEAR_ERROR' })
    }
}

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`)
            dispatch({
                type: 'FETCH_USER',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data
            })
        }
    }
}

export const register = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, body);
            dispatch({
                type: 'REGISTER',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data
            })
        }
    }
}

export const signIn = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, body);
            sessionStorage.setItem('token', res.data.token);
            dispatch({
                type: 'SIGN_IN',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data
            })
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            sessionStorage.removeItem('token');
            dispatch({ type: 'SIGN_OUT' })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data
            })
        }
    }
}