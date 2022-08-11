import React from "react";
import styles from './Inputs.module.css'

const TextArea = (props) => {
    return (
        <textarea {...props} placeholder='Description' className={`border-22px ${styles.textarea}`}/>
    )
}

export default TextArea