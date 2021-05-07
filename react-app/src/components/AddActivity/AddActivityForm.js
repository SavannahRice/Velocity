import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom";
import SideNavBar from "../NavBar/SideNavBar"
import styles from "./AddActivity.module.css"
import photo from "./laurine-bailly.jpg"

function AddActivity () {
    const history = useHistory()
    const [description, setDescription] = useState('')
    const [gpx, setGpx] = useState(null)
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)


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

        const res = await fetch('/api/activities/new', {
            method: "POST",
            body:formData,
        });

        if (res.ok){
            await res.json()
            setImageLoading(false)
            history.push('/');
        }
        else {
            setImageLoading(false)
            console.log("error, no good.")
        }
    }
    

    return (
        <div className={styles.entirepage}>
            <div className={styles.leftSidebar}>
                <SideNavBar/>
            </div>
            <div className={styles.container}>
                <img className={styles.runPhoto} src={photo} alt=""/>
                <h2 className={styles.centeredText}>What did you do today?</h2>
            </div>
            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    name="description"
                    placeholder="Descripion"
                    onChange={updateDescription}
                    value={description}
                    ></input>
                    <div><p>Add GPS File here!</p>
                        <input type="file"
                        onChange={updateGpx}
                        />
                    </div>
                    <div><p>Add Image here!</p>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {(imageLoading) && <p>Loading...</p>}
                </form>

            </div>
        </div>
    )


}

export default AddActivity