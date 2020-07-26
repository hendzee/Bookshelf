import actionTypes from './actionTypes';

const rdxSetSearchFilter = (param) => {
    return {
        type: actionTypes.SET_USER_DATA,
        data: param,
    }
}

export { rdxSetSearchFilter };