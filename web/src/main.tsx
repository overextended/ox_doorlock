import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { debugData } from './utils/debugData';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './theme';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <VisibilityProvider>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </VisibilityProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
