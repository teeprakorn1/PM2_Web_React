import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import styles from "./NavigationBar.module.css";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard-icon.svg";
import { ReactComponent as EmployeeIcon } from "../../assets/icons/employee-icon.svg";
import { ReactComponent as AddAdminIcon } from "../../assets/icons/add-employee-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout-icon.svg";

Modal.setAppElement("#root"); // ป้องกัน warning ของ react-modal

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    closeLogoutModal();
    navigate("/login"); // เปลี่ยนเส้นทางไปหน้า login (เปลี่ยนตามโปรเจคของคุณ)
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.RuleLabel}>Admin</div>
      <div className={styles.employeeName}>Suttipong Poonsawat</div>
      <div className={styles.linearBlank}></div>
      <ul className={styles.navbarList}>
        <li 
          className={`${styles.navbarItem} ${activePath === "/dashboard" ? styles.active : ""}`} 
          onClick={() => handleNavigation("/dashboard")}
        >
          <span className={styles.navbarLink}>
            <DashboardIcon width="20" height="20" /> Dashboard
          </span>
        </li>
        <li 
          className={`${styles.navbarItem} ${activePath === "/employee" ? styles.active : ""}`} 
          onClick={() => handleNavigation("/employee")}
        >
          <span className={styles.navbarLink}>
            <EmployeeIcon width="20" height="20" /> Employee
          </span>
        </li>
        <li 
          className={`${styles.navbarItem} ${activePath === "/add-admin" ? styles.active : ""}`} 
          onClick={() => handleNavigation("/add-admin")}
        >
          <span className={styles.navbarLink}>
            <AddAdminIcon width="20" height="20" /> Add Admin
          </span>
        </li>
        <li 
          className={styles.navbarItem} 
          onClick={openLogoutModal}
        >
          <span className={styles.navbarLink}>
            <LogoutIcon width="20" height="20" /> Logout
          </span>
        </li>
      </ul>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={closeLogoutModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>ยืนยันการออกจากระบบ</h2>
        <p>คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
        <div className={styles.modalButtons}>
          <button onClick={closeLogoutModal} className={styles.cancelButton}>ยกเลิก</button>
          <button onClick={handleLogout} className={styles.confirmButton}>ออกจากระบบ</button>
        </div>
      </Modal>
    </div>
  );
};

export default NavigationBar;
