import React, { useState, useEffect } from "react";
import './ActivityMap.css'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {getSingleActivity} from '../../store/activity'
import  { useDispatch, useSelector } from "react-redux";

function Map (id) {

    const [activityTrack, setActivityTrack] = useState(null)
    const blueOptions = { color: '#4b6cff' }
    const activityId = id.id
    const dispatch = useDispatch()
    
    // Retrieves a single activity from the backend. After the activity is successfully retrieved, 
    // the track is set with the useState hook. 
    // const get_activity = async (e) => {
    //     const activity = await fetch(`api/activities/${activityId}`)

    //     if (activity.ok){
    //         const track = await activity.json()
    //         setActivityTrack(track.track)
    //     }
    // }

    // useEffect(() => {
    //     get_activity()
    // }, [])

    useEffect(() => {
        
        const getMapPoints = async () => {
            const track = await dispatch(getSingleActivity(id))
            // console.log(track.track)
            if (track){
            setActivityTrack(track.track)}

        }

        getMapPoints()

    }, [dispatch])

    // This calculates the middle index from the array of [latitude, longitude] subarray retrieved
    // from the backend and sets the middle index as the center point of the map. 
    if (activityTrack){
        let middleIndex = Math.floor(activityTrack.length/2)
        let center = activityTrack[middleIndex]
        

        return (
            <div>
                <div id="mapid" ></div>
                <MapContainer center={center} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline pathOptions={blueOptions} positions={activityTrack}/>
                </MapContainer>
            </div>
        )
    }

    if (!activityTrack) return null;

}

export default Map