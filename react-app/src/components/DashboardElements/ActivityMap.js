import React from "react";
import './ActivityMap.css'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

function Map (activity) {

    const blueOptions = { color: '#4b6cff' }
    const activityTrack = activity.id.gps_file_url

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