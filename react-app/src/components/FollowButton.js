import React, {  useState } from "react";
import styles from '../components/Dashboard.module.css'

function FollowButton (userId) {
    const [buttonText, setButtonText] = useState('Follow')
    // const user = useSelector(state => state.session.user);
    // const dispatch = useDispatch()

    const addFollower = async (e) => {
        e.preventDefault()
        const id = userId.userId
        setButtonText('Following')
        
        const response = await fetch(`/api/users/follow/${id}`, {
            method: "POST"
            })
        const responseData = await response.json();
        
      }

      return (
        <button className={styles.followBtn}
        onClick={addFollower}
      >{buttonText}
      </button>

      )
    



}

export default FollowButton