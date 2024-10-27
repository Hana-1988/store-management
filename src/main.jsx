import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Modal from 'react-modal';
import './global.css'
import axios from 'axios';


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // فرض می‌کنیم توکن در localStorage ذخیره شده است
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


Modal.setAppElement('#root');


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
