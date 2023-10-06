import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainRouter from './MainRouter'; // MainRouterをインポート
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainRouter /> {/* AppをMainRouterに変更 */}
  </React.StrictMode>
);

reportWebVitals();
 