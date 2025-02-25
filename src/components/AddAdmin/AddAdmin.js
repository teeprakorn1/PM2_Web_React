import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Navbar from '../NavigationBar/NavigationBar';
import { decryptToken } from '../../utils/crypto';
import styles from './AddAdmin.module.css';

Modal.setAppElement('#root');

function AddAdmin() {
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [formData, setFormData] = useState({
    Employee_Username: '',
    Employee_Password: '',
    Employee_FirstName: '',
    Employee_LastName: '',
    Employee_Email: '',
    Employee_Phone: '',
    EmployeeType_ID: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_GET_EMPLOYEETYPE,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": decryptToken(localStorage.getItem("token")),
            },
          }
        );

        const filteredData = response.data.map((employeeType) => ({
          EmployeeType_ID: employeeType.EmployeeType_ID,
          EmployeeType_Name: employeeType.EmployeeType_Name,
        }));

        setEmployeeTypes(filteredData);
      } catch (error) {
        console.error('Error fetching employee types:', error);
      }
    };

    fetchEmployeeTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const extractIdParts = (employeeId) => {
    const match = employeeId.match(/^([A-Za-z]+)(\d+)$/);
    if (match) {
      const letters = match[1];
      let numbers = match[2];
      let incrementedNumber = (parseInt(numbers) + 1).toString();
      while (incrementedNumber.length < numbers.length) {
        incrementedNumber = '0' + incrementedNumber;
      }
  
      return { letters, numbers: incrementedNumber };
    }
    return { letters: "Nan", numbers: "Nan" };
  };
  
  const handleSubmit = async (e) => {
    let { letters, numbers } = "Nan";
    e.preventDefault();
    const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');
  
    if (!isFormComplete) {
      setModalMessage('Please fill out all fields.');
      setIsModalOpen(true);
      return;
    }
  
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.Employee_Phone)) {
      setModalMessage('Please enter a valid phone number (10 digits).');
      setIsModalOpen(true);
      return;
    }
  
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_GET_TOP_EMPLOYEE,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": decryptToken(localStorage.getItem("token")),
          },
        }
      );
  
      const employeeId = response.data["Employee_ID"];
      const { letters: extractedLetters, numbers: extractedNumbers } = extractIdParts(employeeId);
      letters = extractedLetters;
      numbers = extractedNumbers;
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }

    if (letters === "Nan" || numbers === "Nan"){
      setModalMessage('Error occurred while adding admin.');
      setIsModalOpen(true);
      return;
    }
  
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_ADD_EMPLOYEE,
        {
          Employee_ID: letters+numbers,
          Employee_Username: formData.Employee_Username,
          Employee_Password: formData.Employee_Password,
          Employee_FirstName: formData.Employee_FirstName,
          Employee_LastName: formData.Employee_LastName,
          Employee_Email: formData.Employee_Email,
          Employee_Phone: formData.Employee_Phone,
          EmployeeType_ID: formData.EmployeeType_ID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": decryptToken(localStorage.getItem("token")),
          },
        }
      );
  
      const result = response.data;
      if (result.status) {
        setModalMessage('Admin added successfully.');
        setFormData({
          Employee_Username: '',
          Employee_Password: '',
          Employee_FirstName: '',
          Employee_LastName: '',
          Employee_Email: '',
          Employee_Phone: '',
          EmployeeType_ID: ''
        });
      } else {
        setModalMessage('Error adding admin.');
      }
    } catch (error) {
      setModalMessage('Error occurred while adding admin.');
    }
  
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Add Admin</h1>

        <div className={styles.tableContainer}>
          <div className={styles.editFormContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label>Username*</label>
                <input
                  type="text"
                  name="Employee_Username"
                  value={formData.Employee_Username}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <label>Password*</label>
                <input
                  type="text"
                  name="Employee_Password"
                  value={formData.Employee_Password}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <label>First Name*</label>
                <input
                  type="text"
                  name="Employee_FirstName"
                  value={formData.Employee_FirstName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <label>Last Name*</label>
                <input
                  type="text"
                  name="Employee_LastName"
                  value={formData.Employee_LastName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <label>Email*</label>
                <input
                  type="email"
                  name="Employee_Email"
                  value={formData.Employee_Email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <label>Phone*</label>
                <input
                  type="text"
                  name="Employee_Phone"
                  value={formData.Employee_Phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formRow}>
                <label>Employee Type*</label>
                <select
                  name="EmployeeType_ID"
                  value={formData.EmployeeType_ID}
                  onChange={handleChange}
                >
                  <option value="">Select Employee Type.</option>
                  {employeeTypes.map((type) => (
                    <option key={type.EmployeeType_ID} value={type.EmployeeType_ID}>
                      {type.EmployeeType_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formButtons}>
                <button type="submit" className={styles.addButton}>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>{modalMessage}</h2>
        <div className={styles.modalButtons}>
          <button onClick={closeModal} className={styles.confirmButton}>OK</button>
        </div>
      </Modal>
    </div>
  );
}

export default AddAdmin;
