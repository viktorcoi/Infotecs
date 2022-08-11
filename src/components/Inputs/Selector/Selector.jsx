
import React from "react";
import styles from '../Inputs.module.css'
import arrow from '../../../assets/img/selector-arrow.svg'
import { useState } from "react";
import BlockOption from "./BlockOptions";

const Selector = (props) => {

    const [open, setOpen] = useState(false)

    return (
        <div className="pos-relative none-select">
            <div tabIndex={0} onBlur={() => setOpen(false)} onClick={() => setOpen(!open)} 
                className={`pos-relative cursor-pointer d-flex items-center`}>
                <output name={props.name} className={`border-22px cursor-pointer ${styles.selector}`}>
                    {props.title}
                </output>
                <img className={`transition_0_3 pos-absolute ${open ? styles.open : ''}`} alt='open' src={arrow} />
            </div>
            {(
                <BlockOption showoption={open ? 'open' : ''}>
                    {props.items.map((item, i) => ( // мапим все элементы массива полученные в родителе
                        <output {...props} title='' key={i} value={item} 
                            className={`transition_0_3 cursor-pointer`}>
                            {item}
                        </output>
                    ))}
                </BlockOption>
            )}
        </div>
    )
}

export default Selector