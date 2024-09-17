import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from 'react-redux';
import {store, persistor} from './Store/store.ts';
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById('root')!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
    <App />
  </Provider>,
  </PersistGate>
)
