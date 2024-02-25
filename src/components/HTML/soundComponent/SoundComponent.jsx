import { useStore } from "../../../store.jsx"
import styles from './styles.module.scss'

export default function SoundComponent(props) {
    const store = useStore()
    // Говорим какие стили прописывать
    const isActiveClass = props.rendered ? styles.active : "";
    const soundsActive = store.soundsActive ? styles.on : styles.off;


    return <>
        <div className={`${styles.audioContainer} ${soundsActive} ${isActiveClass}`}
        onClick={() => { store.soundsActive = !store.soundsActive }}
        >
            <div className="audioPicture hover1">
                <div className="audio-line"/>
            </div>
        </div>
    </>
}