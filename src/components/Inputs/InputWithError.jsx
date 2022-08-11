
import React from "react";
import styles from './Inputs.module.css'

const InputWithError = (props) => {

    return (
        <div className="pos-relative d-flex items-center">
            <input {...props} className={`border-22px transition_0_3 ${styles[props.errorshow] ?? ""} ${styles.input}`}/>
            <div className={`pos-absolute border-22px transition_0_3 ${styles.error} ${styles[props.errorshow]}`}>
                <p>{props.errortext}</p>
            </div>
        </div>
    )
}

export default InputWithError