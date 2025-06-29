import styles from './Features.module.css';
import featuresData from './featureData.js';
import featureImage from '../assets/featuresImage.png'

function Features() {
    return (
        <>
        <h2 className={styles.head}>Features: </h2>
        <div className={styles.featuresContainer}>
                <img src={featureImage} alt="Image" className={styles.image}/>
            <div className={styles.feature}>
                {featuresData.map((feature) => <Feature key="feature.title" feature={feature}/> )}
            </div>
        </div>
        </>
    )
}

function Feature({feature}) {
    return (
        <div className={styles.points}>
            <h3 className={styles.title}><span className={styles.icon}>{feature.icon}</span>{feature.title}</h3>
            <p className={styles.para}>{feature.description}</p>
        </div>
    )
}

export default Features;