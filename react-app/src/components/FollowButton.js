import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import  { useDispatch, useSelector } from "react-redux";
import styles from '../components/Dashboard.module.css'
import {getUser} from '../store/session'

function FollowButton (userId) {
    const [buttonText, setButtonText] = useState('Follow')
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const addFollower = async (e) => {
        e.preventDefault()
        const id = userId.userId
        setButtonText('Following')
        
        const response = await fetch(`/api/users/follow/${id}`, {
            method: "POST"
            })
        const responseData = await response.json();
        
      }

      return (
        <button className={styles.followBtn}
        onClick={addFollower}
      >{buttonText}
      </button>

      )
    



}

export default FollowButton