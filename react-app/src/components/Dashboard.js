import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../store/activity";
import styles from './Dashboard.module.css';
import Following from './DashboardElements/following';
import SideNavBar from '../components/NavBar/SideNavBar'
import {getUser } from '../store/session'
import Map from './DashboardElements/ActivityMap'
import SinglePost from './FriendsActivities/Post'




function Dashboard() {

    const user = useSelector(state => state.session.user);
    const followers = user.followers
    const activities = user.activities
    // const gps_url = user.activities[0].gps_file_url
    const dispatch = useDispatch()
    

    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.middleBar}>
                {activities.map(activity => (
                    <div className={styles.middle}>
                        <div className={styles.profileHeader}>
                            <img className={styles.avatarImg} src={user.avatar_img} alt=""/><p>{user.username}</p>
                        </div>
                        <div className={styles.mapDiv}><Map id={activity.id}/></div>
                        <SinglePost activity={activity} />
                    </div>

                    // <div className={styles.middle}>
                    //     <div className={styles.profileHeader}>
                    //         <img className={styles.avatarImg} src={user.avatar_img} alt=""/><p>{user.username}</p>
                    //     </div>
                    //     <div className={styles.mapDiv}><Map id={activity.id}/></div>
                    //     <div className={styles.photoAndDescriptionDiv}>
                    //         <img className={styles.activityPhoto} src={activity.photo_url} alt=""/>
                    //         <div>{activity.activity_description}</div>
                            
                    //         <div className={styles.stats}>
                    //             <span>
                    //                 <p>Distance</p>
                    //                 <p>{activity.distance} miles</p>
                    //             </span>
                    //             <span>
                    //                 <p>Time</p>
                    //                 <p>{activity.duration} hours</p>
                    //             </span>
                    //             <span>
                    //                 <p>Elevation</p>
                    //                 <p>600 ft</p>
                    //             </span>
                            
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
            <div className={styles.rightSidebar}><h3>Your Friends</h3>
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
