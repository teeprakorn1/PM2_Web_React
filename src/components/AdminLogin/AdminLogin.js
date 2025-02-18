import React, { useState } from "react";
import styles from './AdminLogin.module.css';
import InputField from './InputField';
import axios from "axios";

const AdminLogin = () => {

  const [Employee_Username, setUsername] = useState("");
  const [Employee_Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/login', {
        Employee_Username,
        Employee_Password
      });

      const result = response.data;
      console.log(result);
      alert(result['message']);

      if (result['status'] === true) {
        localStorage.setItem('token', result['token']);
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const inputFields = [
    { id: "username", 
      icon: "https://cdn.builder.io/api/v1/image/assets/1baa14441d964e0c88fb017cf19c887f/c210f3676a8e8669dcff06049eda5578c2d98676222103415fcd9ae680db238c?apiKey=1baa14441d964e0c88fb017cf19c887f&", 
      placeholder: "Email / Username", type: "text", value: Employee_Username, onChange: (e) => setUsername(e.target.value)},
    { id: "password", icon: "https://cdn.builder.io/api/v1/image/assets/1baa14441d964e0c88fb017cf19c887f/e1decfd68d8589bd044f6fc0706f620cd40e1691bfe77988cef9ecc7df9c1d64?apiKey=1baa14441d964e0c88fb017cf19c887f&", 
    placeholder: "Password", type: "password", value: Employee_Password, onChange: (e) => setPassword(e.target.value)}
  ];

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          {inputFields.map((field, index) => (
            <InputField
              key={index}
              id={field.id}
              icon={field.icon}
              placeholder={field.placeholder}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
