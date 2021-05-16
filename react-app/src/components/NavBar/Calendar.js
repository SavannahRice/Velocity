import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./NavBar.module.css"
import "./Calendar.css"



function ActivityCalendar () {

    const [value, onChange] = useState(new Date());
    const dates = [3, 10, 13, 22]

    // const setDates = (date) => {
    //   console.log(date.getDay(), date.getMonth())
    //   if (date.getMonth() === 5 && date.getDay() ===13) {
    //     'wednesday'
    //   }
    // }

    return (
        <div><h3 className={styles.calHeader}>Activity Calendar</h3>
          <Calendar
            tileClassName={({ date, view }) => {return view === 'month'  && dates.includes(date.getDate())   ? 'highlight' : null}}
          />
        </div>
      );

}

export default ActivityCalendar;