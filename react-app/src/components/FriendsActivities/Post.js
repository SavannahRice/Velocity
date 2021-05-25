
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import styles from './FriendsActivities.module.css'
import {getFollowingActivities, likeActivity, unlikeActivity,  getSingleActivity} from '../../store/activity'
import {getUser} from '../../store/session'
// import {getSingleActivity} from '../../store/activity'
import { getSuggestedUsers } from "../../store/suggested";

function SinglePost (activity) {
    
    const singleactivity = activity.activity
    const user = useSelector(state => state.session.user);
    
    const dispatch = useDispatch()
    const [userLiked, setUserLiked] = useState(false)
    const userId = user.id
    const [activityId, setActivityId] = useState()
    const activityLikes = activity.activity.likes
    let numLikes = singleactivity.likes.length;
    const [likes, setLikes] = useState(numLikes)
    

    const userIdArr = []
    let isLiked = false

    activityLikes.map((like) => {
        userIdArr.push(like.user_id)
    })


    if (userIdArr.includes(userId)){
        isLiked = true
    }


    const handleLike = () => {
         dispatch(likeActivity(activityId))
         setUserLiked(true)
         dispatch(getSingleActivity(activityId))
         setLikes(likes => likes + 1)
       
    }

    const handleUnlike = () => {
        dispatch(unlikeActivity(activityId))
        setUserLiked(false)
        dispatch(getSingleActivity(activityId))
        setLikes(likes => likes - 1)
    }


    const displayLikes = (activity) => {
        
        if (userLiked){
            return <div value={activityId}><i className="fas fa-heart" onClick={handleUnlike} onMouseOver={() => setActivityId(activity.id)} value={activityId}></i><span>{likes} likes</span></div>
        } else {
            return <div ><i className="far fa-heart" onClick={handleLike} onMouseOver={() => setActivityId(activity.id)} value={activityId}></i><span>{likes} likes</span></div>
        }

       
    }

    


    return (
        <div className={styles.middle}>
            <div className={styles.activityImageWrapper}><img  className={styles.activityPhoto} src={singleactivity.photo_url} alt=""/></div>
            <div className={styles.description}>{displayLikes(singleactivity)}</div>
            <div className={styles.description}>{singleactivity.activity_description}</div>
            <div className={styles.stats}>
                <span>
                    <p>Distance</p>
                    <p>{singleactivity.distance} miles</p>
                </span>
                <span>
                    <p>Time</p>
                    <p>{singleactivity.duration} hours</p>
                </span>
                <span>
                    <p>Average Speed</p>
                    <p>{singleactivity.avg_speed} mph</p>
                </span>
            </div>
                            
        </div>
    )

}

export default SinglePost;