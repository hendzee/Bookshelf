import { createStore, combineReducers } from 'redux';
import { authReducer, searchFilterReducer } from './reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    searchFilter: searchFilterReducer
});

const configure = () => {
    return createStore(rootReducer);
}

export default configure;