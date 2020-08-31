import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import App from './views/App';
import proxy from './utils/proxy';
import './index.css';

proxy();
ReactDOM.render(
  <React.StrictMode>
    <Store.Provider>
      <App />
    </Store.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
