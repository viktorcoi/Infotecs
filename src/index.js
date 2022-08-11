import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css'
import MainPage from './pages/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root')); // указываем где рендерить
root.render ( // указываем что рендерить
    <React.StrictMode>
        <MainPage/>
    </React.StrictMode>
);
