
import React, { useState } from "react";
import  {  useSelector } from "react-redux";
import styles from './NavBar.module.css';
import AddActivity from '../AddActivity/AddActivityForm';
import Calendar from "../NavBar/Calendar";
import ActivityStats from "../NavBar/ActivityStats";

const SideNavBar = () => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    // const [showAddForm, setShowAddForm] = useState(false);

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