import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivities } from "../store/activity";
import styles from './Dashboard.module.css';
import Calendar from './DashboardElements/calendar';
import Following from './DashboardElements/following';
import AWS from 'aws-sdk';
import Map from './DashboardElements/map'
import SideNavBar from '../components/NavBar/SideNavBar'
import {getUser } from '../store/session'
import aws from 'aws-sdk'




function Dashboard() {

    const user = useSelector(state => state.session.user);

    const followers = user.followers
    const activities = user.activities
    const gps_url = user.activities[0].gps_file_url
    console.log('followers', followers)
    console.log('activities', activities)
    
    const dispatch = useDispatch()
    

    // const obj = s3.getObject('042521srtestbucket', 'trailforks.geojson' )
    // const gpx_file = obj.get()['Body'].read()



    useEffect(() => {
        dispatch(getActivities())
        dispatch(getUser(user.id))
    }, [dispatch])

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

    // const readFile = () => {

    // }


    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.middleBar}>
                {activities.map(activity => (
                    <div className={styles.middle}>
                        <div><h3>Activity</h3></div>
                        <div><img className={styles.activityPhoto} src={activity.photo_url} alt=""/></div>
                        <div>{activity.activity_description}</div>
                        {/* {getFileName(activity)} */}
                        <div className={styles.stats}>
                            <span>
                                <p>Distance</p>
                                <p>{activity.distance} miles</p>
                            </span>
                            <span>
                                <p>Time</p>
                                <p>{activity.duration} hours</p>
                            </span>
                            <span>
                                <p>Elevation</p>
                                <p>600 ft</p>
                            </span>
                            
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.rightSidebar}><h3>Your Friends</h3>
                <Following/>
            </div>
        </div>

    )

}

export default Dashboard;