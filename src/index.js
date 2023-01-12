import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Soon from './components/Soon';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<Home />}></Route>
        <Route path='help' element={<Soon/>}></Route>
        <Route path='stats' element={<Soon />}></Route>
      </Route>
    </Routes>
  </Router>
);