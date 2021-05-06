import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivities } from "../../store/activity";
import AWS from 'aws-sdk';

function Map(){

    const user = useSelector(state => state.session.user);

    const followers = user.followers
    const activities = user.activities
    const gps_url = user.activities[0].gps_file_url

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    /* eslint-disable no-undef */
// Initialize and add the map
// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//      zoom: 11,
//      center: {lat: 45.9110992961, lng: -112.2425238602  },
//    });
//    // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//    map.data.loadGeoJson(
//      gps_url
//    );
//   }

//   const map = initMap()



    

  return (
    
    <div id='map'>
        <iframe
            title='googleMap'
                id='googleMap'
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDqx09mzXJMueG2ClpeEgp9U6xYGCQYlrs&q=victor+idaho`}>
            </iframe>
    </div>
    
  )



}

export default Map

// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 40, lng: -110 },
//       zoom: 4,
//     });
//     const deckOverlay = new deck.GoogleMapsOverlay({
//       layers: [
//         new deck.GeoJsonLayer({
//           id: "earthquakes",
//           data:
//             "https://042521srtestbucket.s3-us-west-2.amazonaws.com/trailforks.geojson",
//           filled: true,
//           pointRadiusMinPixels: 2,
//           pointRadiusMaxPixels: 200,
//           opacity: 0.4,
//           pointRadiusScale: 0.3,
//           getRadius: (f) => Math.pow(10, f.properties.mag),
//           getFillColor: [255, 70, 30, 180],
//           autoHighlight: true,
//           transitions: {
//             getRadius: {
//               type: "spring",
//               stiffness: 0.1,
//               damping: 0.15,
//               enter: (_) => [0],
//               duration: 10000,
//             },
//           },
//           onDataLoad: (_) => {
//             progress.done(); // hides progress bar
//           },
//         }),
//       ],
//     });
//     deckOverlay.setMap(map);
//   }