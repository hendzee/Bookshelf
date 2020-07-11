import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers';

const rootReducer = combineReducers({
    auth: authReducer
});

const configure = () => {
    return createStore(rootReducer);
}

export default configure;