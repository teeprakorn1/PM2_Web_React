import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../NavigationBar/NavigationBar';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeAdmin.module.css';
import { ReactComponent as EditIcon } from '../../assets/icons/pencil-icon.svg'; 
import { decryptToken } from '../../utils/crypto';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeeAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const navigate = useNavigate();

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
          Employee_RegisDate: employee.Employee_RegisDate,
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

  const handleEditClick = (id) => {
    setSelectedEmployeeId(id);
    setModalIsOpen(true);
  };

  const confirmEdit = () => {
    navigate(`/edit-employee/${selectedEmployeeId}`);
  };

  const filteredEmployees = employees.filter((employee) => {
    const regisDate = new Date(employee.Employee_RegisDate).toLocaleDateString();

    return (
      employee.Employee_Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Employee_FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Employee_LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Employee_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Employee_ID.toString().includes(searchTerm) ||
      employee.Employee_Phone.toString().includes(searchTerm) ||
      regisDate.includes(searchTerm)
    );
  });

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

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className={styles.employeeTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Register Date</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.Employee_ID}>
                    <td>{employee.Employee_ID}</td>
                    <td>{employee.Employee_Username}</td>
                    <td>{employee.Employee_FirstName}</td>
                    <td>{employee.Employee_LastName}</td>
                    <td>{employee.Employee_Email}</td>
                    <td>{employee.Employee_Phone}</td>
                    <td>{new Date(employee.Employee_RegisDate).toLocaleDateString()}</td>
                    <td>{employee.EmployeeType_Name}</td>
                    <td>
                      <button 
                        onClick={() => handleEditClick(employee.Employee_ID)}
                        className={styles.editButton}
                      >
                        <EditIcon className={styles.editIcon} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        className={styles.modal} 
        overlayClassName={styles.overlay}
      >
        <h2>Are you sure you want to edit this employee?</h2>
        <div className={styles.modalButtons}>
          <button onClick={() => setModalIsOpen(false)} className={styles.cancelButton}>BACK</button>
          <button onClick={confirmEdit} className={styles.confirmButton}>EDIT</button>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeAdmin;
