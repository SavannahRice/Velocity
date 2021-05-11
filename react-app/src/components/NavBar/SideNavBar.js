import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from '../LogoMakr.png'
import styles from './NavBar.module.css'
import AddActivity from '../AddActivity/AddActivityForm'
import { Modal } from '../context/Modal'

const SideNavBar = () => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddActivity = async (e) => {
        setShowModal(!showModal)
        console.log(showModal)
    }

    

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
            <button className='navlinkDiv' onClick={handleAddActivity}>Add Activity
                {showModal && (
                            <AddActivity />
                )}
            </button>
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