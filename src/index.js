import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import Reducer from "./reducer";
import routes from "./routes"

const reducer = Reducer( hashHistory );
const createStoreWithMiddleware = applyMiddleware( thunk )( createStore );
const store = createStoreWithMiddleware( reducer );
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store} >
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  rootElement
);
