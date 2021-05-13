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
    
    
    
    useEffect(() => {
        console.log('in useeffect')
        dispatch(getUser(user.id))
        setFollowing(user.following.length)

    }, [])

    return (
        <div className={styles.activityStatsTableDiv}><h3>Your Stats</h3>
            <table className={styles.activityStatsTable}>
                <tr className={styles.rowHeaders}>
                    <th>Activities</th>
                    <th>Miles</th>
                    <th>Hours</th>
                    {/* <th>Miles</th> */}
                </tr>
                <tr>
                    <td>{numActivities}</td>
                    <td>{following}</td>
                    <td>{numFollowers}</td>
                </tr>
            </table>
        </div>
    )

}

export default ActivityStats