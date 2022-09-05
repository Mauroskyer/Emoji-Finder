import styles from "./emojiPicker.module.scss"

export default function EmojiButton({emoji, onClick}) {

    function handleOnClickEmojiButtonContainer() {
        onClick(emoji);
    }

    return(
        <button className={styles.emojiButton} onClick={handleOnClickEmojiButtonContainer}>{emoji.symbol}</button>
    )
}