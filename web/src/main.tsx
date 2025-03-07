import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { DoorColumn } from './store/doors';
import { customTheme } from './theme';
import { debugData } from './utils/debugData';
import { isEnvBrowser } from './utils/misc';

debugData<DoorColumn[]>([
  {
    action: 'updateDoorData',
    data: [
      {
        name: 'Door name',
        passcode: 'Supersecret123',
        autolock: 300,
        id: 0,
        zone: 'Mission Row',
        category: 'Police Dept',
        characters: ['charid1', 'charid2'],
        groups: {
          ['police']: 0,
          ['ambulance']: 1,
        },
        items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
        lockpickDifficulty: [],
        lockSound: null,
        unlockSound: null,
        maxDistance: 15.2,
        state: true,
        doors: true,
        auto: true,
        lockpick: true,
        hideUi: true,
        doorRate: null,
        holdOpen: true,
      },
    ],
  },
]);

debugData(
  [
    {
      action: 'updateDoorData',
      data: {
        [0]: {
          name: 'New door',
          category: 'Police Dept',
          passcode: 'Supersecret123',
          autolock: 300,
          id: 2,
          zone: 'Mission Row',
          characters: ['charid1', 'charid2'],
          groups: {
            ['police']: 0,
            ['ambulance']: 1,
          },
          items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
          lockSound: null,
          unlockSound: null,
          maxDistance: 15.2,
          state: true,
          doors: true,
          auto: true,
          lockpick: true,
          hideUi: true,
          doorRate: null,
          holdOpen: true,
        },
      },
    },
  ],
  3000
);

debugData(
  [
    {
      action: 'setVisible',
      data: undefined,
    },
  ],
  2000
);

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
  document.getElementById('root')
);
