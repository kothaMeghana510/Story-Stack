import { Outlet, useSearchParams } from 'react-router-dom';
import styles from '../likedComponents/Slider.module.css';
import Navigation from './Navigation';
function Slider() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
        <div className={styles.slider}>
            <Navigation /> 
            <Outlet />       
        </div>
    )
}

export default Slider;