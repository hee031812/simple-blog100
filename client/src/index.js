import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/components/assets/scss/style.scss';
import App from './App';

import store from './Reduser/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
