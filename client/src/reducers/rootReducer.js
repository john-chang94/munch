import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashReducer from './dashReducer';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
    auth: authReducer,
    dash: dashReducer,
    review: reviewReducer,
    user: userReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
        state.review.reviews = undefined
        state.review.images = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;