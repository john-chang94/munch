import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashReducer from './dashReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    dash: dashReducer,
    user: userReducer,
    review: reviewReducer
});

export default rootReducer;