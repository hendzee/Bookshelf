import actionTypes from '../actions/actionTypes';

const initialState = {
    filterData: {
        orderBy: 'ORDER_BY_TITLE',
        ASC: 'ASC'
    }
}

const searchFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_ITEM_FILTER:
            return Object.assign({}, state, {
                filterData: action.data
            })
    
        default:
            return {
                ...state
            }
    }
}

export { searchFilterReducer }