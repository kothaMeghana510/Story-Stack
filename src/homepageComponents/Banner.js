import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";


function Banner() {
    const navigate = useNavigate();
    return (
        <div className={styles.bannerContainer}>
            <h1 className={styles.head}>Story Stack</h1>
            <p>Find Books | Save Favorites | Build Your Library</p>
            <div>
                <button onClick={() => navigate("/explore")} className={styles.btn}>Explore</button>
            </div>
            <svg
    viewBox="0 0 1440 320"
    className={styles.bannerWave}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8e2de2" />
        <stop offset="100%" stopColor="#4a00e0" />
      </linearGradient>
    </defs>

    <path
      fill="url(#waveGradient)"
      fillOpacity="1"
      d="M0,160L80,165.3C160,171,320,181,480,170.7C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160V320H0Z"
    />
  </svg>
    </div>
    )
}

export default Banner;