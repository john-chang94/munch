import axios from 'axios';

export const fetchFeatured = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('http://localhost:5000/api/restaurants');
            dispatch({
                type: 'FETCH_FEATURED',
                payload: res.data.data.slice(0, 5)
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data
            })
        }
    }
}

export const fetchUser = user_id => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/user', user_id);
            dispatch({
                type: 'FETCH_USER',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data
            })
        }
    }
}