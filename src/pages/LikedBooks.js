import NavLinks from "../components/NavLinks";
import Slider from "../likedComponents/Slider";
import Layout from "../likedComponents/Layout";
import Navigation from "../likedComponents/Navigation";
import { Outlet } from 'react-router-dom';
function LikedBooks() {
        return (
        <div>
            <NavLinks />
            <div className="screen">
                <div>
                <Slider />  
                </div>
                <div>
                <Layout />
                </div>
            </div>
        </div>
    )
}

export default LikedBooks;