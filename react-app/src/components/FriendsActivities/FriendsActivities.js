
import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import SideNavBar from '../NavBar/SideNavBar'
import styles from './FriendsActivities.module.css'
import SinglePost from './Post'


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

    // const followingUsers = []
    // following.forEach((follow) => {
    //     followingUsers.push(follow.user_id)
    // })

    // useEffect(() => {
    //     dispatch(getFollowingActivities(followingUsers))
    //     // dispatch(getLikes())
    // }, [dispatch])

    // console.log('here is following', following[0].activities)
    const newObj = {}
    const newArr = []

    
    
    following.map((activityArr) => {
        // console.log(activityArr.activities)
        for (let i = 0; i < activityArr.activities.length; i++){
            let current = activityArr.activities[i]
            newArr.push(current)
        }
    } )

    console.log(newArr)

    // console.log(newObj)
    // Object.values(newObj).map(activity => {
    //     console.log(activity)
    // })
    //  console.log(newObj[18].activity_description)

    // if (!followingActivities) return null;


    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.friendsActivities}>
                {newArr.map(activity => (
                    <SinglePost activity={activity} />
                ))}
                {/* {Object.values(newObj).map(activity => (
                    
                   <SinglePost activity={newObj[18]} />
                ))} */}
            </div>
        </div>
    )

}

export default FriendsActivities