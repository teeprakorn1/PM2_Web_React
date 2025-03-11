import React from 'react';
import Navbar from '../NavigationBar/NavigationBar';
import styles from './DashboardEmployee.module.css';

function DashboardEmployee() {

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>DashBoard</h1>
        <iframe title="ForeCast_pm25_1" width="1220" height="2760" src="https://app.powerbi.com/view?r=eyJrIjoiOTVkZjYzMTctOThjOS00ZjIxLThkNmYtNDI1ZTdmOTEzN2JkIiwidCI6IjU3ZDY5NWQ0LWFkODYtNDRkMy05Yzk1LTcxNzZkZWFjZjAzZCIsImMiOjEwfQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    </div>
  );
}

export default DashboardEmployee;