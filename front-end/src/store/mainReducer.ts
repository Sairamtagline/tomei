import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import signUpReducer from "./Reducers/signUpReducer";

const reducers = combineReducers({ SignUpUser : signUpReducer })

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store;