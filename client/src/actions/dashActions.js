import axios from 'axios';

export const clear = () => {
    return dispatch => {
        dispatch({ type: 'CLEAR_ERROR' })
    }
}

export const fetchFeatured = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants`);
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

export const fetchRestaurant = (restaurant_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurant_id}`)
            dispatch({
                type: 'FETCH_RESTAURANT',
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