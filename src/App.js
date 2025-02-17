import './App.css';
import AdminLogin from './components/AdminLogin/AdminLogin';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<AdminLogin/>} />
        <Route exact path='/AdminLogin' element={<AdminLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;