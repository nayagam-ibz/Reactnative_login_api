import {createStore,applyMiddleware} from 'redux'

import rootReducer from '../reducers'
import ReduxPromise from 'redux-promise';

let store = createStore(rootReducer,applyMiddleware(ReduxPromise))


export default store;