import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadReducer } from './shared-library/movies-list/reducers/index.js';

const store = createStore(combineReducers({
    allData: LoadReducer
}), {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById("root"));