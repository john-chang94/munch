import axios from 'axios';

export const clear = () => {
    return dispatch => {
        dispatch({ type: 'CLEAR_ERROR' })
    }
}

const token = sessionStorage.getItem('token');
    if (token) {
      // Set global headers for axios, need to set in other parents components
      const tokenConfig = { 'token': token }
      axios.defaults.headers = tokenConfig
    }

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/verify/user`)
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