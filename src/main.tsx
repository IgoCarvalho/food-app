import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { enableMSW } from './api/mocks/index.ts';

import './styles/global.css';

enableMSW().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: react needs this
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
