import React from 'react';
import ReactDOM from 'react-dom/client';
import { DashboardRoutes } from './routers/DashboardRoutes';
import './styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DashboardRoutes />
  </React.StrictMode>
);