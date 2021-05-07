import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from '../LogoMakr.png'
import styles from './NavBar.module.css'

const SideNavBar = () => {
    const user = useSelector(state => state.session.user)

    if (!user) return null;

    return (
        <nav className={styles.sideNav}>
            <div className='navlinkDiv'>
                <NavLink to="/" exact={true} className={styles.notactive} activeClassName={styles.active} activeStyle={{color: "white"}}>
                    Dashboard
                </NavLink>
            </div>
            <div className='navlinkDiv'>
                <NavLink to="/feed" exact={true} className={styles.notactive} activeClassName={styles.active} activeStyle={{color: "white"}}>Friends Activities</NavLink>
            </div>
            <div className='navlinkDiv'>
                <NavLink to='/profile' exact={true} className={styles.notactive} activeClassName={styles.active} activeStyle={{color: "white"}}>Profile</NavLink>
            </div>
            <div className='navlinkDiv'>
                <NavLink to='/newactivity' exact={true}  className={styles.notactive} activeClassName={styles.active} activeStyle={{color: "white"}}>Add Activity</NavLink>
            </div>
            <div className='navlinkDiv'>
                <NavLink to='/discover' exact={true} className={styles.notactive} activeClassName={styles.active} activeStyle={{color: "white"}}>Explore</NavLink>
            </div>
            <div className='navlinkDiv'>
                <LogoutButton />
            </div>
            
        </nav>
    )


}

export default SideNavBar