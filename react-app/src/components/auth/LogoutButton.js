import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import styles from '../NavBar/NavBar.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className={styles.addActivityBtn} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
