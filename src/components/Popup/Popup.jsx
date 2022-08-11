import React from "react";
import BlueBlock from "../Blocks/BlueBlock";
import styles from './Popup.module.css'
import close from '../../assets/img/close.svg'
import Button from "../Buttons/Button";

const Popup = (props) => {
    return (
        <div className={`d-flex transition_0_3 ${styles['bg-popup']} ${styles[props.className] ?? ""}`}>
            <div onClick={props.clickClose} className={styles['for-close']}></div>
            <BlueBlock addClass={`margin-auto ${styles.popup}`}>
                <div className="d-flex between items-center">
                    <h2>{props.title}</h2>
                    <img className="cursor-pointer transition_0_3" onClick={props.clickClose} alt="close" src={close}/>
                </div>
                <div className={`d-flex between ${styles['for-buttons']}`}>
                    <Button onClick={props.clickClose} view='blue'>No</Button>
                    <Button onClick={props.clickYes} view='white'>Yes</Button>
                </div>
            </BlueBlock>
        </div>
    )
}

export default Popup;