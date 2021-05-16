import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import styles from './NavBar.module.css';

const ActivityStats = () => {
    const user = useSelector(state => state.session.user)
    const activities = useSelector(state => state.session.user.activities)
    const [following, setFollowing] = useState()
    const dispatch = useDispatch();

    const numActivities = activities.length;
    const numFollowers = user.followers.length;
    const numFollowing = user.following.length;
    let allMiles = 0;
    let allDuration = 0;

    activities.map(activity => {
        allMiles += activity.distance;
        allDuration += activity.duration;
    })
    
    
    useEffect(() => {
        dispatch(getUser(user.id))
        setFollowing(user.following.length)

    }, [])

    return (
        <div className={styles.activityStatsTableDiv}><h3>Your Stats</h3>
            <table className={styles.activityStatsTable}>
                <tbody>
                    <tr className={styles.rowHeaders}>
                        <th>Activities</th>
                        <th>Miles</th>
                        <th>Hours</th>
                        {/* <th>Miles</th> */}
                    </tr>
                    <tr>
                        <td>{numActivities}</td>
                        <td>{Math.round(allMiles)}</td>
                        <td>{Math.round(allDuration)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default ActivityStats