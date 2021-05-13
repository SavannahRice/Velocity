import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';
import styles from './NavBar.module.css';

const ProfileButton = () => {
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)

    // function to open the menu
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    // close the menu
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        return (() => document.removeEventListener('click', closeMenu))
    }, [showMenu]);

    return (
        <>
            <button onClick={openMenu} className={styles.profileButton}>
                <div className={styles.imageCropper}><img src={user.avatar_img} alt="" className={styles.avatarImg}/></div>
            </button>
            {showMenu && (
                <div className={styles.dropList}>
                    <NavLink to='/profile' exact={true} >Edit Profile</NavLink>
                    <LogoutButton/>
                </div>
            )

            }
        </>
    )
}

export default ProfileButton;