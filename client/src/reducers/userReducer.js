const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_ERROR':
            return {
                ...state,
                userError: action.payload
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                userError: action.payload
            }
        case 'FETCH_USER':
            return {
                ...state,
                user: action.payload.data
            }
        case 'FETCH_USER_IMAGE':
            return {
                ...state,
                userImage: action.payload.data
            }
        default:
            return state;
    }
}

export default userReducer;