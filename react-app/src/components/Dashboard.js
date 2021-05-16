import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../store/activity";
import styles from './Dashboard.module.css';
import Following from './DashboardElements/following';
import SideNavBar from '../components/NavBar/SideNavBar';
import {getUser } from '../store/session';
import Map from './DashboardElements/ActivityMap';
import SinglePost from './FriendsActivities/Post';
import { Modal } from '../components/context/Modal';
import { NavLink } from 'react-router-dom';




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
        const post = Object.values(e.target)[1]
        await fetch(`api/activities/${activityId}`, {
            method: "DELETE"
        })
        return dispatch(getUser(user.id))

    }

    const handleEdit = async (e) => {
        setShowModal(true)
        const post = Object.values(e.target)[1].value
        console.log(post)
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
        // console.log('ID from EDIT',activityId)
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
                <Following/>
            </div>
            
            
        </div>

    )

}

export default Dashboard;

// useEffect(async () => {
    //     const result = await dispatch(getActivities())
    //     dispatch(getUser(user.id))
    //     // console.log(result.tracks[0])
    //     track = result.tracks[0]
    // }, [dispatch])

    
    

    // function initMap() {
    //     let map = new google.maps.Map(document.getElementById("map"), {
    //      zoom: 11,
    //      center: {lat: 45.9110992961, lng: -112.2425238602  },
    //    });
    //    // NOTE: This uses cross-domain XHR, and may not work on older browsers.
    //    map.data.loadGeoJson(
    //      '/gps_files/GregsAprilTrack.geojson'
    //    );
    //   }
    // const getFileName = async (activity) => {
    //     const activityPath = activity.gps_file_url.split('/')
    //     console.log(activityPath[activityPath.length-1])
    //     const params = {Bucket: '042521srtestbucket', Key: activityPath[activityPath.length-1]}
    //     const response = await s3.getObject(params).promise()
    //     const fileContent = response.Body.toString('utf-8');
    //     console.log(fileContent)
    // }
