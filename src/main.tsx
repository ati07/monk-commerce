import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NestedListComponent} from './Home.tsx'
import "./styles.css";
import "./index.css";
// import "./App.css";
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

createRoot(document.getElementById('root')!).render(
  <>
    <AppProvider i18n={enTranslations}>
      <NestedListComponent />
      {/* <App/> */}
   </AppProvider>
    
  </>
  ,
)
