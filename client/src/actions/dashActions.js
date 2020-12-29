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