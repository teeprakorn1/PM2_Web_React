import React from 'react';
import styles from './AdminLogin.module.css';

const InputField = ({icon, placeholder, type, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <img
        src={icon}
        alt=""
        className={styles.inputIcon}
      />
      <label htmlFor={`input-${placeholder}`} className={styles.visuallyHidden}>
        {placeholder}
      </label>
      <input
        type={type}
        id={`input-${placeholder}`}
        placeholder={placeholder}
        className={styles.inputField}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;