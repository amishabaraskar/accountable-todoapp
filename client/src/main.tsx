import { StrictMode } from 'react'
import ReactDOM  from 'react-dom/client'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store.ts";

import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <BrowserRouter>

    <ReduxProvider store={store}>

    <App />
    </ReduxProvider>
    </BrowserRouter>

  </StrictMode>,
)
