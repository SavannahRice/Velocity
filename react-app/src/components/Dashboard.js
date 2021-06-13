import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { getActivities, getFollowingActivities } from "../store/activity";
import styles from './Dashboard.module.css';
// import Following from './DashboardElements/following';
import SideNavBar from '../components/NavBar/SideNavBar';
import {getUser } from '../store/session';
import Map from './DashboardElements/ActivityMap';
import SinglePost from './FriendsActivities/Post';
import { Modal } from '../components/context/Modal';
import { NavLink } from 'react-router-dom';
import UsersList from "./UsersList";




function Dashboard() {

    const user = useSelector(state => state.session.user);
    const followers = user.followers
    const activities = user.activities
    // const gps_url = user.activities[0].gps_file_url
    const dispatch = useDispatch()
    const [activityId, setActivityId] = useState()
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [formUpdate, setFormUpdate] = useState(false)

    const handleDelete = async (e) => {
        let result = window.confirm('Are you sure you want to delete this activity?')
        if (result){
            const post = Object.values(e.target)[1]
        await fetch(`api/activities/${activityId}`, {
            method: "DELETE"
        })
        return dispatch(getUser(user.id))


        }
        // const post = Object.values(e.target)[1]
        // await fetch(`api/activities/${activityId}`, {
        //     method: "DELETE"
        // })
        // return dispatch(getUser(user.id))
        else return;

    }

    const handleEdit = async (e) => {
        setShowModal(true)
        const post = Object.values(e.target)[1].value
        setDescription(post.activity_description)
        setActivityId(post.id)

    }

    const updateDescription = (e) => {
        setNewDescription(e.target.value)
    }

    const handleSumbit = async (activity,  e) => {
        e.preventDefault()
        // const id = Object.values(e.target)[1].value
        const id = activityId
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
            dispatch(getUser(user.id))
        }
    }

    useEffect(() => {
        dispatch(getUser(user.id))
        dispatch(getFollowingActivities())
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
                {activities.map(activity => (
                    <div className={styles.middle} key={activity.id}>
                        <div className={styles.profileHeader}>
                            <div className={styles.header}>
                                <div className={styles.headerDiv} className={styles.imageCropper}>
                                    <img className={styles.avatarImg} src={user.avatar_img} alt=""/>
                                </div>
                                <span>{user.username}</span>
                            </div>
                            <div className={styles.headerDiv}><i className="fas fa-edit" value={activity} onMouseOver={() => setActivityId(activity.id)} onClick={handleEdit} ></i><i className="fas fa-trash-alt"  value={activity.id} onMouseOver={() => setActivityId(activity.id)} onClick={handleDelete}></i></div>
                        </div>
                        <div className={styles.mapDiv}><Map id={activity.id}/></div>
                        <SinglePost activity={activity} />
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <div className={styles.editFormDiv}>
                                    <form className={styles.editForm} action="" onSubmit={(e) => handleSumbit(activity, e)} value={activity.id}><h2>Edit Activity</h2>
                                        <input 
                                        className={styles.editDescription}
                                        type="text"
                                        name="description"
                                        placeholder={description}
                                        onChange={updateDescription}
                                        value={newDescription}
                                        ></input>
                                        <button className={styles.editActivityButton}type="submit" value={activity.id}>Submit</button>
                                        
                                    </form>
                                </div>
                            </Modal>
                                
                        )}
                        
                    </div>

                ))}
            </div>
            <div className={styles.rightSidebar}><h3>Suggested Users</h3>
                <UsersList/>
            </div>
            
            
        </div>

    )

}

export default Dashboard;

