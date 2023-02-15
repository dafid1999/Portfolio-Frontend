import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import App from './App';
import SSRProvider from 'react-bootstrap/SSRProvider';


ReactDOM.render(
  <SSRProvider>
    <App />
  </SSRProvider>,
  document.getElementById('root')
);
