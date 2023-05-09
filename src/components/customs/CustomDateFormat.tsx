import React from 'react'
import moment from 'moment';
import styles from "./toast.module.scss"


interface Props {
    date: string;
    time?: string;
}
const CustomDateFormat = ({ date, time }: Props) => {
    return (
        <div className={styles.dateFormat}>
            <p className={styles.date}> {moment(date).format('MMM D YYYY')}</p>
            <span className={styles.time}>{moment(time).format('h:mm A')}</span>
        </div>
    )
}

export default CustomDateFormat