import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import App from './views/App';
import proxy from './utils/proxy';

interface Config {
  id?: string;
}

export function init(config: Config = {}) {
  proxy();

  const id = config.id || 'mod-header-container';
  const ele = document.createElement('div');

  ele.id = id;
  document.body.appendChild(ele);

  ReactDOM.render(
    <React.StrictMode>
      <Store.Provider>
        <App />
      </Store.Provider>
    </React.StrictMode>,
    document.getElementById(id)
  );
}
