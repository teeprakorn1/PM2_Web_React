import React from 'react';
import Navbar from '../NavigationBar/NavigationBar';
import styles from './DashboardEmployee.module.css';

function DashboardEmployee() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>DashBoard</h1>
      </div>
    </div>
  );
}

export default DashboardEmployee;
