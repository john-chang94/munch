export default (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'ADD_REVIEW':
            return {
                ...state,
                review: action.payload
            }
        default:
            return state;
    }
}