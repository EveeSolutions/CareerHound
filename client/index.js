import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { store } from './app/store';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

