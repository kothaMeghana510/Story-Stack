import styles from './Video.module.css';
import video from  '../assets/DemoVideo.mp4';
function Video(){
    return (
        <div>
           <h2 className={styles.head}>Demo:</h2>
           <div className={styles.videoContainer}>
                <video controls autoPlay muted loop className={styles.video}>
                    <source src={video} type="video/mp4" />
                </video>
           </div>
        </div>
    )
}

export default Video;