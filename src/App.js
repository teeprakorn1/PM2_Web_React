import './App.css';
import Login from './components/LoginPage/LoginPage';
import DashboardEmployee from './components/DashboardEmployee/DashboardEmployee';
import EmployeeAdmin from './components/EmployeeAdmin/EmployeeAdmin';
import AddAdmin from './components/AddAdmin/AddAdmin';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Login/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/dashboard' element={<DashboardEmployee/>} />
        <Route exact path='/employee' element={<EmployeeAdmin/>} />
        <Route exact path='/add-admin' element={<AddAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;