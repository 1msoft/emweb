import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './pages/App';

import registerServiceWorker from './registerServiceWorker';

const render = (App) => {
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_DEBUG === 'false') {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  } else {
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById('root')
    );
  }
  registerServiceWorker();
}

render(App)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./pages/App', () => {
        const NextApp = require('./pages/App').default;
        render(NextApp);
    })
}
