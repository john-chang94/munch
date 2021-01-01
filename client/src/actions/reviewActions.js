import axios from 'axios';

export const addReview = (body) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/reviews`, body);
            dispatch({
                type: 'ADD_REVIEW',
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