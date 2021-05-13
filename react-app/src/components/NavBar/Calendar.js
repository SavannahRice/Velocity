import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./NavBar.module.css"

function ActivityCalendar () {

    const [value, onChange] = useState(new Date());

    return (
        <div><h3 className={styles.calHeader}>Activity Calendar</h3>
          <Calendar
            onChange={onChange}
            value={value}
            styles={{outline: "none"}}
          />
        </div>
      );

}

export default ActivityCalendar;