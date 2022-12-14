import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>

      <Route path='/' element={<App />} >
        <Route index element={<Home />}></Route>
      </Route>


    </Routes>
  </Router>
);