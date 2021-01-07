import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashReducer from './dashReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    dash: dashReducer,
    review: reviewReducer
});

export default rootReducer;