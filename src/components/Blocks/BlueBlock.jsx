import React from "react";
import styles from './Blocks.module.css'

const BlueBlock = (props) => {
    return (
        <div className={`border-20px d-flex transition_0_3 
            ${props.addClass}
            ${styles['blue-block']} 
            ${styles[props.className] ?? ''} 
            ${styles[props.side] ?? ''}`}>
            {props.children} 
        </div>
    )
}

export default BlueBlock