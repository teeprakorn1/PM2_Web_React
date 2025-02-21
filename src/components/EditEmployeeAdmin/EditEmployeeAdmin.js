import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../NavigationBar/NavigationBar';
import styles from './EditEmployeeAdmin.module.css';
import { decryptToken } from '../../utils/crypto';

function EditEmployeeAdmin() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const storedToken = localStorage.getItem("token");
      const decryptedToken = decryptToken(storedToken);

      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_ADMIN_EMPLOYEE,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": decryptedToken
            }
          }
        );

        const filteredData = response.data.map(employee => ({
          Employee_ID: employee.Employee_ID,
          Employee_Username: employee.Employee_Username,
          Employee_Email: employee.Employee_Email,
          Employee_FirstName: employee.Employee_FirstName,
          Employee_LastName: employee.Employee_LastName,
          Employee_Phone: employee.Employee_Phone,
          EmployeeType_Name: employee.EmployeeType_Name
        }));

        setEmployees(filteredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const selectedEmployee = employees.find(employee => employee.Employee_ID === 'E001');
    setSelectedEmployee(selectedEmployee);
  }, [employees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveEdit = () => {
    if (selectedEmployee) {
      console.log("Employee updated:", selectedEmployee);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Edit Employee</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.tableContainer}>
            <div className={styles.idEmployees}>
              ID: {selectedEmployee?.Employee_ID || 'Loading...'}
            </div>

            {selectedEmployee && (
              <div className={styles.editFormContainer}>
                <form className={styles.form}>
                  <div className={styles.formRow}>
                    <label>Username</label>
                    <input
                      type="text"
                      name="Employee_Username"
                      value={selectedEmployee?.Employee_Username || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="Employee_FirstName"
                      value={selectedEmployee?.Employee_FirstName || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="Employee_LastName"
                      value={selectedEmployee?.Employee_LastName || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="Employee_Email"
                      value={selectedEmployee?.Employee_Email || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label>Phone</label>
                    <input
                      type="text"
                      name="Employee_Phone"
                      value={selectedEmployee?.Employee_Phone || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <label>Employee Type</label>
                    <input
                      type="text"
                      name="EmployeeType_Name"
                      value={selectedEmployee?.EmployeeType_Name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Edit button outside of tableContainer */}
        <div className={styles.formButtons}>
          <button onClick={saveEdit} className={styles.saveButton}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeAdmin;
