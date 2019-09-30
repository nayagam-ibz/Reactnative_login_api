import {combineReducers} from 'redux'
import auth from './authReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: auth,
  form: formReducer
})

export default rootReducer




// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import auth from './authReducer'
// import { reducer as formReducer } from 'redux-form'
// import ReduxPromise from 'redux-promise';

// const rootReducer = combineReducers({
//   auth: auth,
//   form: formReducer
// })

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// export default createStoreWithMiddleware(rootReducer);


