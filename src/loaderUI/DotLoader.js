import styles from '../loaderUI/DotLoader.module.css';

function DotLoader(){
    return (
        <div className={styles.full}>
        <div className={styles.loadContainer}> 
            <span className={`${styles.dot} ${styles.dot1}`}></span>
            <span className={`${styles.dot} ${styles.dot2}`}></span>
            <span className={`${styles.dot} ${styles.dot3}`}></span>
        </div>
        </div>
    )
}

export default DotLoader;