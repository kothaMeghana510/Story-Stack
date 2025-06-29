import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <p><i class="fa-solid fa-copyright"></i> 2025 MeghanaKotha</p>
            <p>Powered by passion and Google searches </p>
            <div className={styles.sectionLinks}>
                    <p><a href='#banner' className={styles.tags}>Banner</a></p>
                    <p><a href='#features' className={styles.tags}>Features</a></p>
                    <p><a href='#demoVedio' className={styles.tags}>Demo Vedio</a></p>
            </div>
            <div className={styles.quote}>
                <p><strong>Code is poetry, and every line tells a story...</strong></p>
            </div>
        </footer>
    )
}

export default Footer;