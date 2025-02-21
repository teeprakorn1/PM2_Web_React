import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../NavigationBar/NavigationBar';
import styles from './EmployeeAdmin.module.css';
import { ReactComponent as EditIcon } from '../../assets/icons/pencil-icon.svg'; 
import { decryptToken } from '../../utils/crypto';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeeAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editableFields, setEditableFields] = useState({});

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

        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = (fieldName) => {
    setEditableFields((prev) => {
      const updatedFields = { ...prev };
      if (updatedFields[fieldName]) {
        updatedFields[fieldName] = false;
      } else {
        Object.keys(updatedFields).forEach(key => {
          updatedFields[key] = false;
        });
        updatedFields[fieldName] = true;
      }
      return updatedFields;
    });
  };

  const handleChange = (e) => {
    setSelectedEmployee({ ...selectedEmployee, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditableFields({});
    setModalIsOpen(false) 
  };

  const handleSave = async () => {
    const storedToken = localStorage.getItem("token");
    const decryptedToken = decryptToken(storedToken);

    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_UPDATE_EMPLOYEE}${selectedEmployee.Employee_ID}`,
        {
          Employee_Email: selectedEmployee.Employee_Email,
          Employee_FirstName: selectedEmployee.Employee_FirstName,
          Employee_LastName: selectedEmployee.Employee_LastName,
          Employee_Phone: selectedEmployee.Employee_Phone,
          EmployeeType_ID: parseInt(selectedEmployee.EmployeeType_ID)
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": decryptedToken
          }
        }
      );
  
      setEmployees(employees.map(emp => 
        emp.Employee_ID === selectedEmployee.Employee_ID 
          ? selectedEmployee 
          : emp
      ));
  
      setModalIsOpen(false);
      setEditableFields({});
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };
  
  
  const handleKeyDown = (e, fieldName) => {
    if (e.key === 'Enter') {
      handleEditClick(fieldName);
    }
  };

  const filteredEmployees = employees.filter(employee => 
    Object.values(employee).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Employee</h1>
        <input 
          type="text" 
          placeholder="Search Employees..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.tableContainer}>
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
              {filteredEmployees.map(employee => (
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
                    <button onClick={() => {
                        setSelectedEmployee(employee);
                        setModalIsOpen(true);
                    }} className={styles.editButton}>
                      <EditIcon className={styles.editIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEmployee && (
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={() => setModalIsOpen(false)} 
          className={styles.modal} 
          overlayClassName={styles.overlay}
        >
          <h2>Edit Employee</h2>
          <div className={styles.inputContainer}>
            <label htmlFor="Employee_Username">Username</label>
            <input 
              id="Employee_Username"
              type="text" 
              name="Employee_Username" 
              value={selectedEmployee.Employee_Username} 
              onChange={handleChange} 
              disabled={!editableFields.Employee_Username} 
              onKeyDown={(e) => handleKeyDown(e, 'Employee_Username')} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Employee_FirstName">First Name</label>
            <input 
              id="Employee_FirstName"
              type="text" 
              name="Employee_FirstName" 
              value={selectedEmployee.Employee_FirstName} 
              onChange={handleChange} 
              disabled={!editableFields.Employee_FirstName} 
              onKeyDown={(e) => handleKeyDown(e, 'Employee_FirstName')} 
            />
            <EditIcon 
              className={styles.editIconAfterInput} 
              onClick={() => handleEditClick('Employee_FirstName')} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Employee_LastName">Last Name</label>
            <input 
              id="Employee_LastName"
              type="text" 
              name="Employee_LastName" 
              value={selectedEmployee.Employee_LastName} 
              onChange={handleChange} 
              disabled={!editableFields.Employee_LastName} 
              onKeyDown={(e) => handleKeyDown(e, 'Employee_LastName')} 
            />
            <EditIcon 
              className={styles.editIconAfterInput} 
              onClick={() => handleEditClick('Employee_LastName')} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Employee_Email">Email</label>
            <input 
              id="Employee_Email"
              type="email" 
              name="Employee_Email" 
              value={selectedEmployee.Employee_Email} 
              onChange={handleChange} 
              disabled={!editableFields.Employee_Email} 
              onKeyDown={(e) => handleKeyDown(e, 'Employee_Email')} 
            />
            <EditIcon 
              className={styles.editIconAfterInput} 
              onClick={() => handleEditClick('Employee_Email')} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Employee_Phone">Phone</label>
            <input 
              id="Employee_Phone"
              type="text" 
              name="Employee_Phone" 
              value={selectedEmployee.Employee_Phone} 
              onChange={handleChange} 
              disabled={!editableFields.Employee_Phone} 
              onKeyDown={(e) => handleKeyDown(e, 'Employee_Phone')} 
            />
            <EditIcon 
              className={styles.editIconAfterInput} 
              onClick={() => handleEditClick('Employee_Phone')} 
            />
          </div>
          <div className={styles.dropdownContainer}>
            <label htmlFor="EmployeeType_Name">Type</label>
            <select
              id="EmployeeType_Name"
              name="EmployeeType_Name"
              value={selectedEmployee.EmployeeType_Name}
              onChange={(e) => 
                setSelectedEmployee({ 
                  ...selectedEmployee, 
                  EmployeeType_Name: e.target.value,
                  EmployeeType_ID: e.target.value === "ADMIN" ? 2 : 1
                })
              }
              disabled={!editableFields.EmployeeType_Name}
              className={styles.dropdownSelect}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>

            <EditIcon
              className={styles.editIconAfterInput}
              onClick={() => handleEditClick('EmployeeType_Name')}
            />
          </div>

          <div className={styles.modalButtons}>
            <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
            <button onClick={handleSave} className={styles.confirmButton}>Save</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EmployeeAdmin;
