import React from 'react';
import Navbar from '../NavigationBar/NavigationBar';
import styles from './AddAdmin.module.css';

function AddAdmin() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Add Admin</h1>
      </div>
    </div>
  );
}

export default AddAdmin;
