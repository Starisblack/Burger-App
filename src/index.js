import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from "./store/reducer/burgerBuilderReducer"
import orderReducer  from './store/reducer/orderReducer';
import thunk from 'redux-thunk';
import authReducer from './store/reducer/authReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  order: orderReducer,
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer

})
const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Provider store={store}>
   <BrowserRouter >
     
    <App />
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

