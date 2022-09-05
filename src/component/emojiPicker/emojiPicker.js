import { forwardRef, useState, useRef, useEffect } from "react"
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";

import styles from "./emojiPicker.module.scss";

/* forwardRef is used to be able to pass a property from a parent component to a child component. */
export default forwardRef((props, inputRef) => {
     /* button status  */
     const [isOpen, setIsopen] = useState(false);
     /* makes our array reactive */
     const [emojis, setEmojis] = useState([...emojiList]);
     /* refers to our layer containing emojis */
     const containerRef = useRef(null);

     useEffect(() => {
        window.addEventListener("click", event => {
            /* when clicking on an element and it turns out to be the parent and not the container */
            if(!containerRef.current.contains(event.target)){
                setIsopen(false);
                setEmojis([...emojiList])
            }
        })

     });


     /* validates that the value exists and returns the value of the emoji. */
     function handleClickOpenEmojiContainer() {
         setIsopen(!isOpen);
     }

     function handleOnClickEmojiButtonContainer(emoji) {
        /* constant with the value of the cursor position */
        const cursorPosition= inputRef.current.selectionStart;
        /* constant with the current text */
        const text = inputRef.current.value;
        /* before the course by clicking */
        const prev = text.slice(0,cursorPosition);
        /* after the course by clicking */
        const next = text.slice(cursorPosition);

        /* continue typing after inserting the emoji */
        inputRef.current.value = prev + emoji.symbol + next;
        /* emoji length */
        inputRef.selectionStart = cursorPosition + emoji.symbol.length;
        /* continue typing after inserting the emoji */
        inputRef.current.selectionEnd = cursorPosition + emoji.symbol.length;
        inputRef.current.focus()
    }

     function handleSearch(event) {
         const querry = event.target.value;

         if(!!querry) {
             const search =emojiList.filter((emoji) => {
                 return(
                    emoji.name.toLowerCase().includes(querry) ||
                    emoji.keywords.toLowerCase().includes(querry)
                 );
             });

             setEmojis([...search])
         }else {
             setEmojis([...emojiList]);
         }
     }

     return(
         <div ref={containerRef} className={styles.inputContainer}>
             <button onClick={handleClickOpenEmojiContainer} className={styles.emojiPickerButton}>😊</button>
             {isOpen ? (
                <div className={styles.emojiPickerContariner}>
                 <EmojiSearch onSearch={handleSearch}/>
                 <div className={styles.emojiList}>
                    {emojis.map((emoji) => (
                        <EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmojiButtonContainer}/>
                        )
                    )}
                 </div>
                </div>
                ) : ("")}
         </div>
     )
})