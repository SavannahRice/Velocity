import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import styles from "./AddActivity.module.css"
import { Modal } from '../context/Modal';
import  { useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/session";
import {createActivity} from "../../store/activity"

function AddActivity () {
    const history = useHistory()
    const [description, setDescription] = useState('')
    const [gpx, setGpx] = useState(null)
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)
    const [showModal, setShowModal] = useState(true);
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);


    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateGpx = (e) => {
        const file = e.target.files[0];
        setGpx(file)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("gpx", gpx)
        formData.append("description", description)
        formData.append("image", image);

        setImageLoading(true)

        dispatch(createActivity(formData))
        setImageLoading(false)
        setShowModal(false)
        history.push('/');
        dispatch(getUser(user.id))
        
    }

    const handleDemoUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        if (image) formData.append("image", image);
        if (description) formData.append("description", description)
        if (!description) formData.append("description", 'Here is a description for the test activity 🚲')

        setImageLoading(true)

        const res = await fetch('/api/activities/new/demo', {
            method: "POST",
            body:formData,
        });

        if (res.ok){
            await res.json()
            setImageLoading(false)
            setShowModal(false)
            history.push('/');
            dispatch(getUser(user.id))

        }
        else {
            setImageLoading(false)
        }

    }
    if(!showModal) return null;

    if (showModal){
    return (
        
            <Modal onClose={() => setShowModal(false)}>
                <div className={styles.formDiv}><p className={styles.activityTitle}>Add an Activity</p>
                    <form id={styles.activityForm} onSubmit={handleSubmit}>
                        <div>
                            <p className={styles.inputTitle}>Activity Description</p>
                            <input
                            type="text"
                            name="description"
                            className={styles.addActivityInput}
                            // placeholder="Descripion"
                            onChange={updateDescription}
                            value={description}
                            ></input>
                        </div>
                        <div><p className={styles.inputTitle}>Select an Activity Type</p>
                            <select>
                                <option value="">Road Biking</option>
                                <option value="">Mountain Biking</option>
                                <option value="">Running</option>
                                <option value="">Trail Running</option>
                            </select>
                        </div>
                        <div><p className={styles.inputTitle}>Add GPS File here</p>
                            <input type="file"
                            className={styles.addActivityInput}
                            onChange={updateGpx}
                            />
                        </div>
                        <div><p className={styles.inputTitle}>Add Image here</p>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                            className={styles.addActivityInput}
                            />
                        </div>
                        <button className={styles.addActivityBtn} type="submit">Submit</button>
                        <button className={styles.addActivityBtn} onClick={handleDemoUpload}>No GPS file? Click here to test.</button>
                        {(imageLoading) && <p>Loading...</p>}
                    </form>
                </div>
            </Modal>
        
    )
}


}

export default AddActivity

