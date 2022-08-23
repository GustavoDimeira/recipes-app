import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FoodsProvider from './context/FoodsProvider';
import DrinksProvider from './context/DrinksProvider';

ReactDOM.render(
  <FoodsProvider>
    <DrinksProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DrinksProvider>
  </FoodsProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
