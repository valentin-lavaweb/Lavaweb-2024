import clickSound from '../../../sounds/clickSound.mp3'
import styles from './styles.module.css'
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store";

export default function CursorComponent(props) {
  const store = useStore();
  
  const audioRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);


  // CREATE AUDIO
  useEffect(() => {
    audioRef.current = new Audio(clickSound);
  }, []);

  const handleCursorClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setWasClicked(true);
    }, 70);
    setTimeout(() => {
      setWasClicked(false);
    }, 140);

    // Click sound
    if (store.soundsActive === true && audioRef.current != null) {
      audioRef.current.pause(); // Остановить воспроизведение текущего звука
      audioRef.current.currentTime = 0; // Сбросить текущее время воспроизведения
      audioRef.current.play(); // Воспроизвести звук
    }
  };

  const cursorClassName = `${styles.cursor} ${store.cursor.hovered ? styles.hover : ''} ${isClicked ? styles.click : ''}`;


  useEffect(() => {
    window.addEventListener('click', handleCursorClick);
    // window.addEventListener('dblclick', requestFullScreen);
    // if (!document.fullscreenElement){
    //   document.requestFullscreen()
    // } else {
    //   document.exitFullscreen()
    // }

    return () => {
      window.removeEventListener('click', handleCursorClick);
    };
  }, []);

  const cursorStyle = {
    display: 'flex',
    position: 'fixed',
    left: `${store.cursor.x}px`,
    top: `${store.cursor.y}px`,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    transition: `${wasClicked ? '0.25s ease-in-out' : ''}`
  };
  const cursorStyleBeforeStart = {
    transition: `0.5s ease-in-out`,
    opacity: `${props.startApp ? '1' : '0'}`,
    transform: 'translate(-50%, -50%) scale(0)'
  };

  return (
    <>
      <div className={cursorClassName} style={props.rendered ? cursorStyle : cursorStyleBeforeStart}>
        <div className={styles.mainPoint} />
        <div className={styles.mainCircle}>
          <div className={styles.halfCircle1}>
            <div className={styles.inCircle} />
          </div>
          <div className={styles.halfCircle2}>
            <div className={styles.inCircle} />
          </div>
        </div>

        <div className={styles.littleCircle}>
          <div className={styles.halfCircle1}>
            <div className={styles.inCircle} />
          </div>
          <div className={styles.halfCircle2}>
            <div className={styles.inCircle} />
          </div>
        </div>

        <div className={styles.bigCircle} />


        <div className={styles.points} style={{transition: `${wasClicked ? '0.25s ease-in-out' : ''}`}}>
          <div className={styles.points1}>
            <div className={styles.point1} />
            <div className={styles.point2} />
          </div>
          <div className={styles.points2}>
            <div className={styles.point1} />
            <div className={styles.point2} />
          </div>
        </div>

      </div>
    </>
  );
}