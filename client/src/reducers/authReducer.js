const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'AUTH_ERROR':
            return {
                ...state,
                authError: action.payload
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                authError: null
            }
        case 'REGISTER':
            return {
                ...state,
                success: action.payload.success
            }
        case 'SIGN_IN':
            return {
                ...state,
                success: action.payload.success,
                user: action.payload.user
            }
        case 'SIGN_OUT':
            return {
                ...state,
                token: null,
                user: null
            }
        case 'FETCH_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};

export default authReducer;