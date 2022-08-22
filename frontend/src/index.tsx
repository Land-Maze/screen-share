import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Home } from './Screens/Home'
import { checkSettings } from './Utils/settings'
import { checkLogs } from './Utils/logs'
import { RoomProvider } from './Context/RoomContext'
import { ConnectValueProvider } from './Context/ConnectValueContext';
import { HostValueProvider } from './Context/HostValueContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

checkSettings()
checkLogs()

root.render(
  <React.StrictMode>
    <RoomProvider>
      <ConnectValueProvider>
        <HostValueProvider>
          <Home />
        </HostValueProvider>
      </ConnectValueProvider>
    </RoomProvider>
  </React.StrictMode>
);