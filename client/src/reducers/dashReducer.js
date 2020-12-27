export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'FETCH_FEATURED':
            return {
                featured: action.payload
            }
        default:
            return state;
    }
}