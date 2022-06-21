import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { debugData } from './utils/debugData';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './theme';
import { isEnvBrowser } from './utils/misc';
import { StoreState } from './store';

debugData<boolean | StoreState>([
  {
    action: 'setVisible',
    data: {
      doorName: 'Door name',
      passcode: 'Supersecret123',
      autolockInterval: '300',
      itemFields: [
        { name: 'mrpd_key', metadata: 'office_key', remove: true },
        { name: 'lockpick' },
      ],
      groupFields: [
        { name: 'police', grade: '0' },
        { name: 'ambulance', grade: '3' },
      ],
      lockSound: null,
      unlockSound: null,
      interactDistance: '15.2',
      checkboxes: {
        locked: true,
        double: true,
        automatic: true,
        lockpick: true,
        showUi: true,
      },
    },
  },
]);

debugData<string[]>([
  {
    action: 'setSoundFiles',
    data: ['button-remote', 'door-bolt-4', 'metal-locker', 'metallic-creak'],
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
