import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import  { useDispatch, useSelector } from "react-redux";
import styles from '../components/Dashboard.module.css'
import FollowButton from '../components/FollowButton'
import {getUser} from '../store/session'


function UsersList() {
  const [users, setUsers] = useState([]);
  const currentUser = useSelector(state => state.session.user)
  const userFollowing = useSelector(state => state.session.user.following);
  
  const [followingIds, setFollowingIds ] = useState()
  const [userId, setUserId] = useState()
  const [buttonText, setButtonText] = useState('Follow')
  const [notFollowing, setNotFollowing] = useState()
  const dispatch = useDispatch()

  
  

  useEffect(() => {
    
    async function fetchData() {
      
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData);
      const arr =  await createFollowIdArr(userFollowing)
      await listNotFollowing(responseData, arr)
      
      
    }

    async function createFollowIdArr(arr) {
      const ids = []
      
      Object.values(arr).map(user => {
        ids.push(user.user_id)
      })
      
      setFollowingIds(ids)
      return ids
    }

    async function listNotFollowing(res, follow) {
      const notFollowingArr = []
      
      Object.values(res).map(user => {
       
        user.map(item => {
          
          if (!follow.includes(item.id) && item.id !== currentUser.id) {
            notFollowingArr.push(item)
          }
        })
      })
      
      setNotFollowing(notFollowingArr)
    }

  

    fetchData();
    // dispatch(getUser(currentUser.id))
    // console.log('inside  use effect')
    
  }, []);

if (!notFollowing) return null;

const userComponents = Object.values(notFollowing).map((user) => {
  
  return (
    <div className={styles.follower}   value={user}>
        <div className={styles.imageCropper}><img src={user.avatar_img}  className={styles.avatarImg} alt=""/> </div>
        <div className={styles.nameAndFollowBtn}>{user.username}
          <FollowButton userId={user.id}/>
        </div>
    </div>
  )
})



  return (
    <>
      {userComponents}
    </>
  );
}

export default UsersList;
