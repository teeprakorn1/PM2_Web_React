import React from 'react';
import styles from './LoginPage.module.css';

const InputField = ({ id, type, placeholder, iconSrc, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <img
        loading="lazy"
        src={iconSrc}
        className={styles.inputIcon}
        alt=""
      />
      <label htmlFor={id} className={styles['visually-hidden']}>{placeholder}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={styles.inputField}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
