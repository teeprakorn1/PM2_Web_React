import './App.css';
import Login from './components/LoginPage/LoginPage';
import DashboardEmployee from './components/DashboardEmployee/DashboardEmployee';
import EmployeeAdmin from './components/EmployeeAdmin/EmployeeAdmin';
import EdiEmployeeAdmin from './components/EditEmployeeAdmin/EditEmployeeAdmin';
import AddAdmin from './components/AddAdmin/AddAdmin';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<DashboardEmployee/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/dashboard' element={<DashboardEmployee/>} />
        <Route exact path='/employee' element={<EmployeeAdmin/>} />
        <Route exact path='/add-admin' element={<AddAdmin/>} />
        <Route exact path='/edit-employee' element={<EdiEmployeeAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;