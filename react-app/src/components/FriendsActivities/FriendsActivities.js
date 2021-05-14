
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import SideNavBar from '../NavBar/SideNavBar'
// import styles from './FriendsActivities.module.css'
import SinglePost from './Post'
import Map from '../DashboardElements/ActivityMap'
import UsersList from '../UsersList';
import {getUser } from '../../store/session';
import { NavLink } from 'react-router-dom';
import {Modal} from '../context/Modal.js';
import Following from "../UsersList";
import styles from '../Dashboard.module.css'


function FriendsActivities () {
    const user = useSelector(state => state.session.user);
    const following = useSelector(state => state.session.user.following)
    const followingActivities = useSelector(state => state.activities.friends)
    const dispatch = useDispatch()
    const [activityId, setActivityId] = useState()
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [formUpdate, setFormUpdate] = useState(false)

    
    // const newObj = {}
    const newArr = []

    
    
    following.map((activityArr) => {
        for (let i = 0; i < activityArr.activities.length; i++){
            let current = activityArr.activities[i]
            newArr.push(current)
        }
    } )


    const updateDescription = (e) => {
        setNewDescription(e.target.value)
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        const id = Object.values(e.target)[1].value
        const formData = new FormData()
        formData.append('description', newDescription)

        setFormUpdate(true)

        const res = await fetch(`/api/activities/${id}`, {
            method: "PATCH",
            body: formData
        })

        if (res.ok){
            await res.json()
            setFormUpdate(false)
            setShowModal(false)
            return dispatch(getUser(user.id))
        }
    }

    useEffect(() => {
        dispatch(getUser(user.id))
    }, [dispatch])

    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.middleBar}>
            <div className={styles.welcomeDiv}>
                <div className={styles.individualUserWelcome}>
                    Welcome, {user.username}
                </div>
                <div className='navlinkDiv'>
                    <NavLink to="/" exact={true} className={styles.notactive} activeClassName={styles.active} >
                        Dashboard
                    </NavLink>
                    <NavLink to="/feed" exact={true} className={styles.notactive} activeClassName={styles.active} >Friends Activities</NavLink>
                </div>
            </div>
                {newArr.map(activity => (
                    <div className={styles.middle}>
                        <div className={styles.profileHeader}>
                            <div className={styles.header}>
                                <div className={styles.headerDiv} className={styles.imageCropper}>
                                    <img className={styles.avatarImg} src={activity.user.avatar_img} alt=""/>
                                </div>
                                <span>{activity.user.username}</span>
                            </div>
                        </div>
                        <div className={styles.mapDiv}><Map id={activity.id}/></div>
                        <SinglePost activity={activity} />
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <div>
                                    <form action="" onSubmit={handleSumbit} value={activity.id}><h2>Edit Activity</h2>
                                        <input 
                                        type="text"
                                        name="description"
                                        placeholder={description}
                                        onChange={updateDescription}
                                        value={newDescription}
                                        ></input>
                                        <button type="submit" value={activity.id}>Submit</button>
                                        
                                    </form>
                                </div>
                            </Modal>
                                
                        )}
                        
                    </div>

                ))}
            </div>
            <div className={styles.rightSidebar}><h3>Suggested Users</h3>
                <Following/>
            </div>
            
            
        </div>
        // <div className={styles.entirepage}>
        //     <div className={styles.leftSidebar}>
        //         <SideNavBar/>
                
        //     </div>
        //     <div className={styles.friendsActivities}>
        //         {newArr.map(activity => (
        //             <>
        //                 <div className={styles.mapDiv}><Map id={activity.id}/></div>
        //                 <SinglePost activity={activity} />
        //             </>
        //         ))}
        //     </div>
        // </div>
    )

}

export default FriendsActivities