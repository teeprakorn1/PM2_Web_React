import React, { useState } from 'react';
import Navbar from '../NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import styles from './EmployeeAdmin.module.css';
import { ReactComponent as EditIcon } from '../../assets/icons/pencil-icon.svg'; 

function EmployeeAdmin() {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 1, name: 'John Doe', username: 'johndoe', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890', type: 'Admin' },
    { id: 2, name: 'Jane Smith', username: 'janesmith', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '098-765-4321', type: 'User' },
    { id: 3, name: 'Samuel Lee', username: 'samuellee', firstName: 'Samuel', lastName: 'Lee', email: 'samuel@example.com', phone: '567-890-1234', type: 'User' },
  ];

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm) ||
    employee.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Employee</h1>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search Employees..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.totalEmployees}>
            Total Employees: {filteredEmployees.length}
          </div>

          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Username</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.username}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.type}</td>
                  <td>
                    <Link to={`/edit-employee/${employee.id}`} className={styles.editButton}>
                      <EditIcon className={styles.editIcon} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAdmin;
