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

/////////////////////////////
/////// AUTH ACTIONS ////////
/////////////////////////////

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`)
            dispatch({
                type: 'FETCH_USER',
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
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
            dispatch({ type: 'ERROR', payload: err.response.data })
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
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            sessionStorage.removeItem('token');
            dispatch({ type: 'SIGN_OUT' })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

/////////////////////////////
/////// DASH ACTIONS ////////
/////////////////////////////

export const fetchFeatured = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants`);
            dispatch({
                type: 'FETCH_FEATURED',
                payload: res.data.data.slice(0, 5)
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const fetchRestaurant = restaurant_id => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurant_id}`)
            dispatch({
                type: 'FETCH_RESTAURANT',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const fetchImagesForRestaurant = restaurant_id => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/review_images/restaurants/${restaurant_id}`);
            dispatch({
                type: 'FETCH_IMAGES_FOR_RESTAURANT',
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const searchRestaurant = params => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants${params}`);
            console.log(res.data)
            dispatch({
                type: 'SEARCH_RESTAURANT',
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const fetchSuggestions = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/suggestions`);
            dispatch({ type: 'FETCH_SUGGESTIONS', payload: res.data })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

/////////////////////////////
////// REVIEWS ACTIONS //////
/////////////////////////////

export const addReview = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/reviews`, body);
            dispatch({
                type: 'ADD_REVIEW',
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const addReviewImage = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/review_images`, body);
            dispatch({
                type: 'ADD_REVIEW_IMAGE',
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}

export const fetchReviewsForRestaurant = restaurant_id => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/restaurant/${restaurant_id}`);
            dispatch({
                type: 'FETCH_REVIEWS_FOR_RESTAURANT',
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }
}