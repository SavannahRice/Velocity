import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom";
import {Modal} from '../components/context/Modal';

function ShowOneUser (user) {
    const [showModal, setShowModal] = useState(false);
    const userEle = user.user;
    return (
        <Modal onClose={()=> setShowModal(false)}>
            <h1>{userEle.username}</h1>
        </Modal>
    )
}

export default ShowOneUser