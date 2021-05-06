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




function Dashboard() {

    const user = useSelector(state => state.session.user);

    const followers = user.followers
    const activities = user.activities
    const gps_url = user.activities[0].gps_file_url
    console.log('followers', followers)
    console.log('activities', activities)
    
    const dispatch = useDispatch()

    // const s3 = new AWS.S3({
    //     accessKeyId: 'AKIAVGTXOKARTQGQ52BB',
    //     secretAccessKey: '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',
    //     Bucket: '042521srtestbucket',
    // })

    // const obj = s3.getObject('042521srtestbucket', 'trailforks.geojson' )
    // const gpx_file = obj.get()['Body'].read()



    useEffect(() => {
        dispatch(getActivities())
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
                        <div className={styles.stats}>
                            <span>
                                <p>Distance</p>
                                <p>{activity.distance}</p>
                            </span>
                            <span>
                                <p>Time</p>
                                <p>{activity.duration}</p>
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