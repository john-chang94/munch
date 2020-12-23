export default (state = {}, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                error: action.err
            }
        case 'SIGN_IN_SUCCESS':
            return {
                ...state
            }
        case 'SIGN_IN_ERROR':
            return {
                state,
                error: action.err
            }
        default:
            return state;
    }
}