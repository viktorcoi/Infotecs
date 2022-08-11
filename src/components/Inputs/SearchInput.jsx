import React, { useEffect, useState } from "react";
import styles from './Inputs.module.css'

const SearchInput = (props) => {

    const {datasearch, callback} = props;
    const [value, setValue] = useState(props.value ?? "");

    useEffect(() => {
        if (callback) {
            callback(datasearch?.filter((v => v.name.indexOf(value) !== -1))); // делаем фильтр для БД по символам в инпуте
        }
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <input className={`border-22px ${styles.input} ${styles.search}`} 
            onChange={(e) => {setValue(e.target.value)}} placeholder='Search' value={value}>
        </input>
    )
}

export default SearchInput