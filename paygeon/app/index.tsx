import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './resets.css';
import HomePage from './page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
