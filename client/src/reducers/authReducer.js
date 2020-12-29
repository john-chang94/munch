export default (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state
            }
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                data: action.payload,
                user: action.payload.user
            }
        default:
            return state;
    }
}