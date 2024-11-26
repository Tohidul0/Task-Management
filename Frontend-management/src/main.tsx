import ReactDOM from 'react-dom/client';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.ts';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</React.StrictMode>
);
