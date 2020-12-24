import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashReducer from './dashReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    dash: dashReducer
});

export default rootReducer;