import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { debugData } from './utils/debugData';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './theme';
import { isEnvBrowser } from './utils/misc';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
