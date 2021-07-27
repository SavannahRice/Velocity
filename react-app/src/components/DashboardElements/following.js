import React, { useState } from "react";
import  {  useSelector } from "react-redux";
import UsersList from "../UsersList"


function Following () {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false)

    return (

        <div className='mainFollowingDiv'>
            <UsersList />
        </div>
    )
}

export default Following