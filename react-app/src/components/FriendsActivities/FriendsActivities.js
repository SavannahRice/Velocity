import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideNavBar from '../NavBar/SideNavBar'
import styles from './FriendsActivities.module.css'
import {getFollowingActivities, likeActivity, unlikeActivity } from '../../store/activity'
// import {getLikes} from '../../store/likes'
import SinglePost from './Post'
// import {getLikes} from '../../store/likes'

function FriendsActivities () {
    const user = useSelector(state => state.session.user);
    const following = useSelector(state => state.session.user.following)
    const followingActivities = useSelector(state => state.activities.friends)
    // const userLikes = useSelector(state => state.likes)
    const dispatch = useDispatch()
    const [userLiked, setUserLiked] = useState(false)
    const userId = user.id
    const [activityId, setActivityId] = useState()
    const [likeId, setLikeId] = useState(false)

    const followingUsers = []
    following.forEach((follow) => {
        followingUsers.push(follow.user_id)
    })

    useEffect(() => {
        dispatch(getFollowingActivities(followingUsers))
        // dispatch(getLikes())
    }, [dispatch])

    
    
    
    

    if (!followingActivities) return null;


    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.friendsActivities}>
                {Object.values(followingActivities).map(activity => (
                   <SinglePost activity={activity} />
                ))}
            </div>
        </div>
    )

}

export default FriendsActivities