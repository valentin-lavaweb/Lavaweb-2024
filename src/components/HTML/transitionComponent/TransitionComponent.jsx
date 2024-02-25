import { useEffect } from 'react';
import { useLoader } from '../../ContentLoader';
import styles from './styles.module.scss'

export default function TransitionComponent(props) {
  const { incrementLoadedCount } = useLoader();

  useEffect(() => {
    // Ваша логика загрузки для Component1
    incrementLoadedCount(); // Увеличиваем счетчик загруженных компонентов
  }, []);
    return <>
    <div className={props.loadingProgress >= 100 ? `${styles.loadingScreen} ${styles.disabled}` : `${styles.loadingScreen}`}>
        <div className={`${styles.blockMain} ${styles.blockMainL}`}>
            <div className={`${styles.block} ${styles.block1}`} />
            <div className={`${styles.block} ${styles.block2}`} />
            <div className={`${styles.block} ${styles.block3}`} />
            <div className={`${styles.block} ${styles.block4}`} />
            <div className={`${styles.block} ${styles.block5}`} />
            <div className={`${styles.block} ${styles.block6}`} />
            <div className={`${styles.block} ${styles.block7}`} />
        </div>
    </div>
    </>
}