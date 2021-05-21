import React, {  useState } from "react";
import styles from '../components/Dashboard.module.css';
import {handleFollow, getSuggestedUsers} from '../store/suggested';
import  { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function FollowButton (userId) {
    const [buttonText, setButtonText] = useState('Follow')
    const dispatch = useDispatch()
    const history = useHistory()

    const addFollower = async (e) => {
        const id = userId.userId
        setButtonText('Following')
        dispatch(handleFollow(id))
      }

      return (
        <button className={styles.followBtn}
        onClick={addFollower}
      >{buttonText}
      </button>

      )
    



}

export default FollowButton