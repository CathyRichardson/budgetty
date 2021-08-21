// imported redux functions, middleware, and reducers that will be used to create the store
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './budgetReducer';
import userReducer from './userReducer';

//combine reducers. THE ROOT REDUCER OBJECT WILL BE USED TO CREATE THE REDUX STORE STATE
const rootReducer = combineReducers({
    budget: budgetReducer,
    user: userReducer
});

//Create the store
//it's exported so it can be used by the Provider component
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));