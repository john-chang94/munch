import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashReducer from './dashReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    dash: dashReducer,
    user: userReducer
});

export default rootReducer;