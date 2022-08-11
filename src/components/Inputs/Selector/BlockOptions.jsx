import React from "react";
import styles from '../Inputs.module.css'

const BlockOption = (props) => {
    return (
        <div {...props} className={`pos-absolute transition_0_3 ${styles[props.showoption] ?? ''} ${styles["for-option"]}`}>
            {props.children}
        </div>
    )
}

export default BlockOption;