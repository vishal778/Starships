import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {thunk} from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, undefined, applyMiddleware(thunk));

export default store;
