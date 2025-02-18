import './App.css';
import Login from './components/LoginPage/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Login/>} />
        <Route exact path='/Login' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;