import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard-icon.svg';
import { ReactComponent as EmployeeIcon } from '../../assets/icons/employee-icon.svg';
import { ReactComponent as AddAdminIcon } from '../../assets/icons/add-employee-icon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout-icon.svg';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.RuleLabel}>Admin</div>
      <div className={styles.employeeName}>Suttipong Poonsawat</div>
      <div className={styles.linearBlank}></div>
      <ul className={styles.navbarList}>
        <li 
          className={`${styles.navbarItem} ${activePath === '/dashboard' ? styles.active : ''}`} 
          onClick={() => handleNavigation('/dashboard')}
        >
          <span className={styles.navbarLink}>
            <DashboardIcon width="20" height="20" /> Dashboard
          </span>
        </li>
        <li 
          className={`${styles.navbarItem} ${activePath === '/employee' ? styles.active : ''}`} 
          onClick={() => handleNavigation('/employee')}
        >
          <span className={styles.navbarLink}>
            <EmployeeIcon width="20" height="20" /> Employee
          </span>
        </li>
        <li 
          className={`${styles.navbarItem} ${activePath === '/add-admin' ? styles.active : ''}`} 
          onClick={() => handleNavigation('/add-admin')}
        >
          <span className={styles.navbarLink}>
            <AddAdminIcon width="20" height="20" /> Add Admin
          </span>
        </li>
        <li 
          className={`${styles.navbarItem} ${activePath === '/logout' ? styles.active : ''}`} 
        >
          <span className={styles.navbarLink}>
            <LogoutIcon width="20" height="20" /> Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
