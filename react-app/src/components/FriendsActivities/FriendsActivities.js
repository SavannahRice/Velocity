
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import SideNavBar from '../NavBar/SideNavBar'
import styles from './FriendsActivities.module.css'
import SinglePost from './Post'
import Map from '../DashboardElements/ActivityMap'


function FriendsActivities () {
    const user = useSelector(state => state.session.user);
    const following = useSelector(state => state.session.user.following)
    const followingActivities = useSelector(state => state.activities.friends)
    const dispatch = useDispatch()
    // const userId = user.id
    // const [activityId, setActivityId] = useState()
    // const [likeId, setLikeId] = useState(false)

    
    // const newObj = {}
    const newArr = []

    
    
    following.map((activityArr) => {
        // console.log(activityArr.activities)
        for (let i = 0; i < activityArr.activities.length; i++){
            let current = activityArr.activities[i]
            newArr.push(current)
        }
    } )

    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.friendsActivities}>
                {newArr.map(activity => (
                    <>
                        <div className={styles.mapDiv}><Map id={activity.id}/></div>
                        <SinglePost activity={activity} />
                    </>
                ))}
                {/* {Object.values(newObj).map(activity => (
                    
                   <SinglePost activity={newObj[18]} />
                ))} */}
            </div>
        </div>
    )

}

export default FriendsActivities