import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideNavBar from '../NavBar/SideNavBar'
import styles from './FriendsActivities.module.css'
import {getFollowingActivities, likeActivity, unlikeActivity} from '../../store/activity'
import {getLikes} from '../../store/likes'

function FriendsActivities () {
    const user = useSelector(state => state.session.user);
    const following = useSelector(state => state.session.user.following)
    const followingActivities = useSelector(state => state.activities.friends)
    const userLikes = useSelector(state => state.likes)
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
        dispatch(getLikes())
    }, [dispatch])

    

    

    const handleLike = () => {
        dispatch(likeActivity(activityId))
        // dispatch(getLikes())
        dispatch(getFollowingActivities(followingUsers))
    }

    const handleUnlike = () => {
        dispatch(unlikeActivity(likeId))
        dispatch(getLikes())
    }


// fas fa-heart is filled in heart
// far fa-heart is heart outline
    const displayLikes = (activity) => {
        const likes = activity.likes
        const numLikes = likes.length

        for (let i = 0; i < likes.length; i++){
            if (likes[i].user_id === userId){
                return (
                    <div value={activity.id}><i class="fas fa-heart" onClick={handleUnlike} onMouseOver={() => setLikeId(activity.likes[i].id)} value={activityId}></i><span>{numLikes} likes</span></div>
                )
            }
        }
        return (
            <div ><i class="far fa-heart" onClick={handleLike} onMouseOver={() => setActivityId(activity.id)} value={activityId}></i><span>{numLikes} likes</span></div>
        )
       
    }

    if (!followingActivities) return null;


    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.friendsActivities}>
                {Object.values(followingActivities).map(activity => (
                    <div className={styles.middle}>
                        <div className={styles.UserDiv}>
                            <img className={styles.userAvatar} src={activity.user.avatar_img} alt=""/>
                            <div className={styles.username}>{activity.user.username}</div>
                        </div>
                        <div><img  className={styles.activityPhoto} src={activity.photo_url} alt=""/></div>
                        <div>{displayLikes(activity)}</div>
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


        </div>
    )

}

export default FriendsActivities