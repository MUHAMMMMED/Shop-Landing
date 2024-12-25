import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './Authentication/UserProvider';
import { SessionProvider } from './components/Provider/CartProvider/SessionContext';
import './styles/dash-tablet.css';
import './styles/dash-variables.css';
import './styles/variables.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <SessionProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SessionProvider>
  </React.StrictMode>
);