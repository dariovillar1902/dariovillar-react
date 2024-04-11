import React from 'react';
import ReactDOM from 'react-dom/client';
import { DashboardRoutes } from './routers/DashboardRoutes';
import './styles/styles.scss';
import { Analytics } from '@vercel/analytics/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DashboardRoutes />
    <Analytics />
  </React.StrictMode>
);