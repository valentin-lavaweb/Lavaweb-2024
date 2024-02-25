import styles from "./styles.module.scss"
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store.jsx";
import { useProgress } from "@react-three/drei";

export default function BottomLoadComponent(props) {
  const store = useStore()
  const [componentRendered, setComponentRendered] = useState(false);
  const startButtonRef = useRef();
  const {progress} = useProgress()

  useEffect(() => {
    setComponentRendered(true)
  }, [])
  
  return <>
  <div className={progress >= 100 ? `${styles.blurContainer} ${styles.active}` : styles.blurContainer}></div>
  <div id="loadingContainer" className={progress >= 100 ? styles.loadingContainer : `${styles.loadingContainer} ${styles.active}`}
  hidden={progress >= 100 ? true : false}
  >
    <div className={progress >= 100 ? "preloaderContainer hidden" : "preloaderContainer"}>
      <div className="preloaderBackground"></div>
      <div className="preloader">
        <div className="loaderCircle"></div>
        <div className="loaderLineMask">
          <div className="loaderLine"></div>
        </div>
      </div>
    </div>
    <div className={(progress >= 100 && componentRendered === true) ? styles.loadingBlock : (progress < 5 ? `${styles.loadingBlock} ${styles.bottom}` : `${styles.loadingBlock} ${styles.active}`)}>
      <div className={styles.loadingNumber}>{Math.trunc(progress)}%</div>
      <div className={progress >= 100 ? `${styles.loadingText} ${styles.hidden}` : styles.loadingText}>
      {progress >= 100 ? "Web-сайт загружен." : "Загружаем web-сайт."}
      </div>
    </div>
    {/* <div ref={startButtonRef} className={progress >= 100 ? `${styles.startButton} ${styles.active}` : styles.startButton} onClick={ () => {
        store.soundsActive = true
    }}>
        <div className={styles.startButtonText}>Начать</div>
        <div className={styles.borderLeft} />
        <div className={styles.borderTop} />
        <div className={styles.borderRight} />
        <div className={styles.borderBottom} />
    </div> */}
  </div>
  </>
}