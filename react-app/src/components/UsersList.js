import React, { useEffect, useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import styles from '../components/Dashboard.module.css';
import FollowButton from '../components/FollowButton';
import { getSuggestedUsers, handleFollow } from '../store/suggested';
import {Modal} from "../components/context/Modal";



function UsersList() {
  
  const [user, setUser] = useState({});
  const suggestedUsers = useSelector(state => state.suggested.suggested)
  
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState();
  const [userId, setUserId] = useState()
  const dispatch = useDispatch()

  
  useEffect(() => {
      dispatch(getSuggestedUsers())

  }, [dispatch])

  useEffect(() => {
    setSuggestions(suggestedUsers)
  }, [suggestedUsers])


 const showSingleUser = async (e, id) =>{
  setUserId(id)
  setUser('')
  setShowModal(true);
  const getUser = async () => {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    user.activities.map(activity => {
      console.log(activity.photo_url)
    })
    setUser(user);
  };
  await getUser()

 }

 

if (!suggestions) return null;

const userComponents = Object.values(suggestions).map((user) => {


return (
  <div key={user.id} className={styles.follower}   value={user} key={user.id}>
      <div className={styles.imageCropper}><img src={user.avatar_img}  className={styles.avatarImg} alt=""/> </div>
      <div className={styles.nameAndFollowBtn}>
        <button className={styles.singleUser}
          onClick={(e) => showSingleUser(e, user.id)}>{user.username}
        </button>
        <FollowButton userId={user.id}/>
      </div>
      
  </div>
)


// return (
//   <div key={user.id} className={styles.follower}   value={user} key={user.id}>
//       <div className={styles.imageCropper}><img src={user.avatar_img}  className={styles.avatarImg} alt=""/> </div>
//       <div className={styles.nameAndFollowBtn}>
//         <button className={styles.singleUser}
//           onClick={(e) => showSingleUser(e, user.id)}>{user.username}
//         </button>
//         <button className={styles.followBtn}
//         onClick={() => addFollower(user.id)}
//         >Follow
//         </button>
//       </div>
      
//   </div>
// )
})



  return (
    <div className='mainFollowingDiv'>
      {userComponents}
      {showModal && (
          <Modal onClose={()=> setShowModal(false)}>
            <div className={styles.modalDiv}>
              <div className={styles.imageCropperModal}><img src={user.avatar_img}  className={styles.avatarImg} alt=""/></div>
              <h1>{user.username}</h1>
              <div>{user.city}, {user.state}</div>
              <FollowButton userId={user.id}/>
              <div className={styles.photosDiv}>
                {user.activities && user.activities.map(activity => (
                  <img className={styles.indUserPhotos} src={activity.photo_url} alt="" />
                ))}
                
              </div>
              
            </div>
          </Modal>
        )}
    </div>
  );
}

export default UsersList;

//This function is a nightmare.
// useEffect(() => {
    
  //   async function fetchData() {
  //     const response = await fetch("/api/users/");
  //     const responseData = await response.json();
  //     setUsers(responseData);
  //     const arr =  await createFollowIdArr(userFollowing)
  //     await listNotFollowing(responseData, arr)
  //   }

  //   async function createFollowIdArr(arr) {
  //     const ids = []
  //     Object.values(arr).map(user => {
  //       ids.push(user.user_id)
  //     })
  //     setFollowingIds(ids)
  //     return ids
  //   }

  //   async function listNotFollowing(res, follow) {
  //     const notFollowingArr = []
  //     Object.values(res).map(user => {
  //       user.map(item => {
  //         if (!follow.includes(item.id) && item.id !== currentUser.id) {
  //           notFollowingArr.push(item)
  //         }
  //       })
  //     })
  //     setNotFollowing(notFollowingArr)
  //   }
  //   fetchData();
  // }, []);
