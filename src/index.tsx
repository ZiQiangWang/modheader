import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import App from './views/App';
import Demo from './demo';
import proxy from './utils/proxy';
proxy();

ReactDOM.render(
  <React.StrictMode>
    <Store.Provider>
      <Demo />
      <App />
    </Store.Provider>
  </React.StrictMode>,
  document.getElementById('mod-header-container')
);
