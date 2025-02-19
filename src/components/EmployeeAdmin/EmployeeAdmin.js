import React from 'react';
import Navbar from '../NavigationBar/NavigationBar';
import styles from './EmployeeAdmin.module.css';

function EmployeeAdmin() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Employee</h1>
      </div>
    </div>
  );
}

export default EmployeeAdmin;
