import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './FriendsActivities.module.css'
import {getFollowingActivities, likeActivity, unlikeActivity,  getSingleActivity} from '../../store/activity'


function SinglePost (activity) {
    const singleactivity = activity.activity
    const user = useSelector(state => state.session.user);
    
    const dispatch = useDispatch()
    const [userLiked, setUserLiked] = useState(false)
    const userId = user.id
    const [activityId, setActivityId] = useState()
    const [likeId, setLikeId] = useState(false)
    const activityLikes = activity.activity.likes

    const userIdArr = []
    let isLiked = false

    activityLikes.map((like) => {
        userIdArr.push(like.user_id)
    })


    if (userIdArr.includes(userId)){
        console.log('set is liked')
        isLiked = true
        setUserLiked(true)
        
    }

    

    useEffect(() => {
        isLiked = userLiked
        console.log('useEffect', userLiked)
        // dispatch(getSingleActivity(activity.activity.id))
    }, [dispatch, userLiked])


    const handleLike = () => {
         dispatch(likeActivity(activityId))
         setUserLiked(true)
        //  isLiked = true
         dispatch(getSingleActivity(activity.activity.id))
       
    }

    const handleUnlike = () => {
        dispatch(unlikeActivity(activityId))
        setUserLiked(false)
        //  isLiked = false
         dispatch(getSingleActivity(activity.activity.id))
    }


    const displayLikes = (activity) => {
        const likes = activity.likes
        const numLikes = likes.length
        

        if (isLiked){
            return <div value={activityId}><i class="fas fa-heart" onClick={handleUnlike} onMouseOver={() => setActivityId(activity.id)} value={activityId}></i><span>{numLikes} likes</span></div>
        } else {
            return <div ><i class="far fa-heart" onClick={handleLike} onMouseOver={() => setActivityId(activity.id)} value={activityId}></i><span>{numLikes} likes</span></div>
        }

        
        

        // for (let i = 0; i < likes.length; i++){
        //     if (likes[i].user_id === userId){
        //         // setUserLiked(true)
        //         // return (
        //         //     <div value={activityId}><i class="fas fa-heart" onClick={handleUnlike} onMouseOver={() => setLikeId(activity.likes[i].id)} value={activityId}></i><span>{numLikes} likes</span></div>
        //         // )
        //     }
        // }
        
        // return (
            
        //     <div ><i class="far fa-heart" onClick={handleLike} onMouseOver={() => setActivityId(activity.id)} value={activityId}></i><span>{numLikes} likes</span></div>
        // )
       
    }

    if (!activity) return null;


    return (
        <div className={styles.middle}>
            <div className={styles.UserDiv}>
                <img className={styles.userAvatar} src={singleactivity.user.avatar_img} alt=""/>
                <div className={styles.username}>{singleactivity.user.username}</div>
            </div>
            <div><img  className={styles.activityPhoto} src={singleactivity.photo_url} alt=""/></div>
            <div>{displayLikes(singleactivity)}</div>
            <div>{singleactivity.activity_description}</div>
            <div className={styles.stats}>
                <span>
                    <p>Distance</p>
                    <p>{singleactivity.distance}</p>
                </span>
                <span>
                    <p>Time</p>
                    <p>{singleactivity.duration}</p>
                </span>
                <span>
                    <p>Elevation</p>
                    <p>600 ft</p>
                </span>
            </div>
                            
        </div>
    )

}

export default SinglePost;