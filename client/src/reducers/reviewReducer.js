const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REVIEW_ERROR':
            return {
                ...state,
                reviewError: action.payload
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                reviewError: null
            }
        case 'CLEAR_REVIEWS':
            return {
                ...state,
                reviews: null
            }
        case 'CLEAR_REVIEW_IMAGES':
            return {
                ...state,
                images: null
            }
        case 'ADD_REVIEW':
            return {
                ...state,
                review: action.payload
            }
        case 'FETCH_REVIEWS_FOR_RESTAURANT':
            return {
                ...state,
                reviews: action.payload
            }
        case 'FETCH_IMAGES_FOR_RESTAURANT':
            return {
                ...state,
                images: action.payload
            }
        case 'FETCH_REVIEWS_BY_USER':
            return {
                ...state,
                reviews: action.payload
            }
        case 'SET_USER_HAS_REVIEW':
            return {
                ...state,
                userHasReview: action.payload
            }
        default:
            return state;
    }
};

export default reviewReducer;