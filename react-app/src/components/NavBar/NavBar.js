import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from '../LogoMakr.png';
import styles from './NavBar.module.css';
import SideNavBar from './SideNavBar';
import ProfileButton from './ProfileDropDown';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  if (!user){
    return (
      <nav className={styles.topNav}>
          <img className={styles.logo} src={logo} alt=""/>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
          
    </nav>
    )
  }


  return (
    <>
    <nav className={styles.topNav}>
        <img src={logo} className={styles.logo} alt=""/>
        <ProfileButton/>
    </nav>
    
    </>
  );
}

export default NavBar;
