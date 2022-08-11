import React from "react";
import styles from './Blocks.module.css'

const Note = (props) => {
    return (
        <div {...props} className={`border-22px cursor-pointer transition_0_3 d-flex between items-center ${styles.note}`}>
            <p>{props.name}</p>
            <div className={`border-circle ${styles[props.status] ?? ''}`}/>
        </div>
    )
}

export default Note