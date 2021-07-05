import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ThemeProvider } from '@material-ui/styles';
import CustomTheme from './CustomTheme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={CustomTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
