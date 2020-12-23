import axios from 'axios';

export const register = user => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/register', user);
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'REGISTER_ERROR',
                payload: err.response.data
            })
        }
    }
}