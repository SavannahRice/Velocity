import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './ActivityMap.css'


import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

function Map (id) {

    const [activityTrack, setActivityTrack] = useState(null)
    const blackOptions = { color: '#4b6cff' }
    const activityId = id.id
    
    
    const get_activity = async (e) => {
        const activity = await fetch(`api/activities/${activityId}`)

        if (activity.ok){
            const track = await activity.json()
            setActivityTrack(track.track)
            

        }
    }

    useEffect(() => {
        get_activity()
    }, [])

    // console.log(activityTrack.length)

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
                    <Polyline pathOptions={blackOptions} positions={activityTrack}/>
                </MapContainer>
            </div>

        )
    }

    if (!activityTrack) return null;


}

export default Map