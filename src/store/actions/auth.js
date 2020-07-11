import actionTypes from './actionTypes';

/** Get user data */
const rdxGetUserData = () => {
    return { 
        type: actionTypes.GET_USER_DATA
    }
}

/** Set user data */
const rdxSetUserData = (param) => {
    return {
        type: actionTypes.SET_USER_DATA,
        data: param
    }
}

export { rdxSetUserData, rdxGetUserData };