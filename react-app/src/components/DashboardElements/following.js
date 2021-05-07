import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from '../Dashboard.module.css'


function Following () {
    const user = useSelector(state => state.session.user)
    const following = user.following

    


    return (

        <div className='mainFollowingDiv'>
            {
                following.map(user => (
                    <div className={styles.follower}>
                        <span><a href=""><img src={user.avatar_img} className={styles.avatarImg} alt=""/></a></span>
                        <a href=""><span>{user.username}</span></a>
                    </div>
                ))
            }
        </div>
    )
}

export default Following