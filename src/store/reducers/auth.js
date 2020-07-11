import actionTypes from '../actions/actionTypes';

const initialState = {
    userData: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DATA:
            return {
                ...state
            }

        case actionTypes.SET_USER_DATA:
            return Object.assign({}, state, {
                userData: action.data
            })
    
        default:
            return {
                ...state
            }
    }
}

export { authReducer };