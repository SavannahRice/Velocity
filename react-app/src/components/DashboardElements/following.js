import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../Dashboard.module.css'
import SingleUser from "../IndividualUser"
import UsersList from "../UsersList"


function Following () {
    const user = useSelector(state => state.session.user)
    const following = user.following
    const [showModal, setShowModal] = useState(false)

    const showUser = () => {
        setShowModal(!showModal)
    }
    


    return (

        <div className='mainFollowingDiv'>
            <UsersList />
            {/* {
                following.map(user => (
                    <>
                    <div className={styles.follower}  onClick={showUser} value={user}>
                        <span><img src={user.avatar_img}  className={styles.avatarImg} alt=""/></span>
                        <a href=""><span>{user.username}</span></a>
                        
                    </div>
                    </>
                    
                ))
            } */}
        </div>
    )
}

export default Following