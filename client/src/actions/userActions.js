import axios from 'axios';

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
            console.log(res.data)
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