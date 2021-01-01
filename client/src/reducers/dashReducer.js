export default (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'FETCH_FEATURED':
            return {
                ...state,
                featured: action.payload
            }
        case 'FETCH_RESTAURANT':
            return {
                ...state,
                restaurant: action.payload
            }
        default:
            return state;
    }
}