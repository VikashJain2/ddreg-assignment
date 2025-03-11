import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <App />
    </BrowserRouter>
  </Provider>
);
