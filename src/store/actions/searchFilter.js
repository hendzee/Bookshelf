import actionTypes from './actionTypes';

const rdxSetSearchFilter = (param) => {
    return {
        type: actionTypes.SET_SEARCH_ITEM_FILTER,
        data: param,
    }
}

export { rdxSetSearchFilter };