import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { debugData } from './utils/debugData';
import { MantineProvider } from '@mantine/core';
import { customTheme } from './theme';
import { isEnvBrowser } from './utils/misc';
import { StoreState } from './store';
import { HashRouter } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';

debugData<boolean | StoreState>([
  {
    action: 'setVisible',
    data: {
      doorName: 'Door name',
      passcode: 'Supersecret123',
      autolockInterval: 300,
      itemFields: [{ name: 'mrpd_key', metadata: 'office_key', remove: true }, { name: 'lockpick' }],
      groupFields: [
        { name: 'police', grade: 0 },
        { name: 'ambulance', grade: 0 },
      ],
      lockSound: null,
      unlockSound: null,
      interactDistance: 15.2,
      checkboxes: {
        locked: true,
        double: true,
        automatic: true,
        lockpick: true,
        hideUi: true,
      },
      doorRate: null,
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
    <MantineProvider withNormalizeCSS withGlobalStyles theme={customTheme}>
      <ModalsProvider modalProps={{ transition: 'slide-up' }}>
        <HashRouter>
          <App />
        </HashRouter>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
