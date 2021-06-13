import React, { useState, useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import image from "./Velocity_Full_resolution.png"

function Images () {
    return (
        <img src={image} alt="" />
    )
}

export default Images