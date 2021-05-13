import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from '../LogoMakr.png';
import styles from './NavBar.module.css';
import AddActivity from '../AddActivity/AddActivityForm';
import { Modal } from '../context/Modal';
import Calendar from "../NavBar/Calendar";
import ActivityStats from "../NavBar/ActivityStats";

const SideNavBar = () => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddActivity = async (e) => {
        setShowModal(true)
    }

    

    if (!user) return null;

    return (
        <>
        <div><ActivityStats/></div>
        <div><Calendar/></div>
        <nav className={styles.sideNav}>
            {/* <div className='navlinkDiv'>
                <NavLink to="/" exact={true} className={styles.notactive} activeClassName={styles.active} >
                    Dashboard
                </NavLink>
            </div>
            <div className='navlinkDiv'>
                <NavLink to="/feed" exact={true} className={styles.notactive} activeClassName={styles.active} >Friends Activities</NavLink>
            </div> */}
            {/* <div className='navlinkDiv'>
                <NavLink to='/profile' exact={true} className={styles.notactive} activeClassName={styles.active} >Edit Profile</NavLink>
            </div> */}
            <button className={styles.addActivityBtn} onClick={handleAddActivity}>+ Add Activity
                {showModal && (
                            <AddActivity />
                )}
            </button>
            {/* <div className='navlinkDiv'>
                <NavLink to='/discover' exact={true} className={styles.notactive} activeClassName={styles.active} activeStyle={{color: "white"}}>Explore</NavLink>
            </div> */}
            {/* <div className='navlinkDiv'>
                <LogoutButton />
            </div> */}
            
        </nav>
        </>
    )


}

export default SideNavBar