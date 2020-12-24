export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'FETCH_RECOMMENDED':
            return {
                recommended: action.payload
            }
        default:
            return state;
    }
}