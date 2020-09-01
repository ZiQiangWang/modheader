import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import App from './views/App';

ReactDOM.render(
  <React.StrictMode>
    <Store.Provider>
      <App />
    </Store.Provider>
  </React.StrictMode>,
  document.getElementById('mod-header-container')
);
