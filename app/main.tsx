// css imports
// import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'virtual:uno.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-dark-blue/theme.css';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
import { I18nProvider } from '@lingui/react';
import { ClickToComponent } from 'click-to-react-component';
// import 'primereact/resources/themes/lara-dark-purple/theme.css'
import { type APIOptions, PrimeReactProvider } from 'primereact/api';
// js imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
// import 'primeflex/primeflex.css'

export function Loader() {
  return (
    <div className="h-screen grid place-items-center">
      <h1>OES - Online Examination System</h1>
    </div>
  );
}

const value: Partial<APIOptions> = {
  appendTo: 'self',
  ripple: true,
};

createRoot(document.querySelector('#root') as Element).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <PrimeReactProvider value={value}>
        <RouterProvider fallbackElement={<Loader />} router={router} />
        <ClickToComponent />
      </PrimeReactProvider>
    </I18nProvider>
  </StrictMode>
);
