import React from 'react';
import AppRoutes from './routes.jsx';
import Providers from './providers.jsx';

export default function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}