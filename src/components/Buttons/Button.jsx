import React from "react";
import styles from './Buttons.module.css'

const Button = (props) => {

    return (
        <button {...props} className={`border-22px none-select ${styles.button} ${styles[props.view] ?? ''}`}>
            {props.children}
        </button>
    )
}

export default Button