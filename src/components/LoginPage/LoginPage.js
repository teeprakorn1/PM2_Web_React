import React, { useEffect, useState } from 'react';
import styles from './LoginPage.module.css';
import InputField from './InputField';
import axios from "axios";

function LoginPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.imageColumn}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/1baa14441d964e0c88fb017cf19c887f/5e90de99d39f09359ce46adc378a3b2404e462ddff91057666756ba3b636333f?apiKey=1baa14441d964e0c88fb017cf19c887f&"
            className={styles.loginImage}
            alt="Admin login illustration"
          />
        </div>
        <div className={styles.formColumn}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h1 className={styles.loginTitle}>Admin Login</h1>
            <InputField
              id="username"
              type="text"
              placeholder="Username"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/1baa14441d964e0c88fb017cf19c887f/572d74c9b2148aa0ca2798fdb1a87d3f94952177f338cb53d17108e18615b32d?apiKey=1baa14441d964e0c88fb017cf19c887f&"
              value={Employee_Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/1baa14441d964e0c88fb017cf19c887f/af15105da7e1d33ad917ad58c51b44f767319238601c41783aaa7b5a558cb04b?apiKey=1baa14441d964e0c88fb017cf19c887f&"
              value={Employee_Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.loginButton} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
