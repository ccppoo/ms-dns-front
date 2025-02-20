import type { ComponentType } from 'react';
import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/api';
import { store } from '@/store';
import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </HelmetProvider>
          </QueryClientProvider>
        </CookiesProvider>
      </Provider>
    </StrictMode>,
  );
}

export default render;
