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

export const verifyUser = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`)
            dispatch({ type: 'VERIFY_USER', payload: res.data })
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data })
        }
    }
}

export const register = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, body);
            dispatch({ type: 'REGISTER', payload: res.data })
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data })
        }
    }
}

export const signIn = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, body);
            sessionStorage.setItem('token', res.data.token);
            
            dispatch({ type: 'SIGN_IN', payload: res.data })
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data })
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            sessionStorage.removeItem('token');
            dispatch({ type: 'SIGN_OUT' })
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data })
        }
    }
}

/////////////////////////////
/////// USER ACTIONS ////////
/////////////////////////////

export const fetchUser = userId => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`)
            dispatch({ type: 'FETCH_USER', payload: res.data })
        } catch (err) {
            dispatch({ type: 'USER_ERROR', payload: err.response.data })
        }
    }
}

export const updateUser = (userId, body) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, body)
        } catch (err) {
            dispatch({ type: 'USER_ERROR', payload: err.response.data })
        }
    }
}

export const updateUserPassword = (userId, body) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/reset-pw/${userId}`, body);
        } catch (err) {
            dispatch({ type: 'USER_ERROR', payload: err.response.data })
        }
    }
} 

export const addUserImage = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/userImages`, body)
        } catch (err) {
            dispatch({ type: 'USER_ERROR', payload: err.response.data })
        }
    }
}

export const fetchUserImage = userId => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/userImages/${userId}`)
            dispatch({ type: 'FETCH_USER_IMAGE', payload: res.data })
        } catch (err) {
            dispatch({ type: 'USER_ERROR', payload: err.response.data })
        }
    }
}

export const deleteUserImage = userId => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/userImages/${userId}`)
        } catch (err) {
            dispatch({ type: 'USER_ERROR', payload: err.response.data })
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
            dispatch({ type: 'FETCH_FEATURED', payload: res.data.data.slice(0, 5) })
        } catch (err) {
            dispatch({ type: 'DASH_ERROR', payload: err.response.data })
        }
    }
}

export const fetchRestaurant = restaurantId => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            dispatch({ type: 'FETCH_RESTAURANT', payload: res.data.data })
        } catch (err) {
            dispatch({ type: 'DASH_ERROR', payload: err.response.data })
        }
    }
}

export const fetchImagesForRestaurant = restaurantId => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviewImages/restaurants/${restaurantId}`);
            dispatch({ type: 'FETCH_IMAGES_FOR_RESTAURANT', payload: res.data })
        } catch (err) {
            dispatch({ type: 'DASH_ERROR', payload: err.response.data })
        }
    }
}

export const search = queries => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants${queries}`);
            dispatch({ type: 'SEARCH', payload: res.data })
        } catch (err) {
            dispatch({ type: 'DASH_ERROR', payload: err.response.data })
        }
    }
}

export const fetchSuggestions = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/suggestions`);
            dispatch({ type: 'FETCH_SUGGESTIONS', payload: res.data })
        } catch (err) {
            dispatch({ type: 'DASH_ERROR', payload: err.response.data })
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
            dispatch({ type: 'ADD_REVIEW', payload: res.data })
        } catch (err) {
            dispatch({ type: 'REVIEW_ERROR', payload: err.response.data })
        }
    }
}

export const addReviewImage = body => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/reviewImages`, body);
            dispatch({ type: 'ADD_REVIEW_IMAGE', payload: res.data })
        } catch (err) {
            dispatch({ type: 'REVIEW_ERROR', payload: err.response.data })
        }
    }
}

export const fetchReviewsForRestaurant = restaurantId => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/restaurants/${restaurantId}`);
            dispatch({ type: 'FETCH_REVIEWS_FOR_RESTAURANT', payload: res.data })
        } catch (err) {
            dispatch({ type: 'REVIEW_ERROR', payload: err.response.data })
        }
    }
}

export const fetchReviewsByUser = userId => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/users/${userId}`)
            dispatch({ type: 'FETCH_REVIEWS_BY_USER', payload: res.data })
        } catch (err) {
            dispatch({ type: 'REVIEW_ERROR', payload: err.response.data })
        }
    }
}