export default (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'FETCH_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}