const dashReducer = (state = {}, action) => {
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
        case 'SEARCH':
            return {
                ...state,
                results: action.payload.data
            }
        case 'FETCH_SUGGESTIONS':
            return {
                ...state,
                suggestions: action.payload
            }
        default:
            return state;
    }
};

export default dashReducer;