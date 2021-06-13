import React, { useState } from 'react';
import  { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./NavBar.module.css"
import "./Calendar.css";
import {Modal } from "../context/Modal";



function ActivityCalendar () {

    const [value, onChange] = useState(new Date());
    const dates = [3, 10, 13, 22]
    const [showModal, setShowModal] = useState(true);
    const userActivities = useSelector(state => state.session.user.activities)
    const activity = userActivities[0]

    
    const getDays = []
    userActivities.map(activity => {
      getDays.push(parseInt(activity.created_at.split(' ')[1]))
    })
    
    

    return (
        <div><h3 className={styles.calHeader}>Activity Calendar</h3>
          <Calendar
            className={styles.Calendar}
            tileClassName={({ date, view }) => {return view === 'month'  && getDays.includes(date.getDate())   ? 'highlight' : null}}
          />
        </div>
      );

}

export default ActivityCalendar;