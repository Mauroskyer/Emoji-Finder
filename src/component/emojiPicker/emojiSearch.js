import { useState } from "react";

import styles from "./emojiPicker.module.scss"

export default function EmojiSearch({onSearch}) {

    const [val, setVal]=useState("");

    function handleChange(event) {
        setVal(event.target.value);
        onSearch(event);
    }
    return(
        <input className={styles.search} type="text" onChange={handleChange} value={val}/>
    )

}