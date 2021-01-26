import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashReducer from './dashReducer';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    dash: dashReducer,
    review: reviewReducer,
    user: userReducer
});

export default rootReducer;