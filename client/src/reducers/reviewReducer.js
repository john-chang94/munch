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
        case 'ADD_REVIEW':
            return {
                ...state,
                review: action.payload.review
            }
        case 'FETCH_REVIEWS_FOR_RESTAURANT':
            return {
                ...state,
                reviews: action.payload.data
            }
        case 'FETCH_IMAGES_FOR_RESTAURANT':
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
}