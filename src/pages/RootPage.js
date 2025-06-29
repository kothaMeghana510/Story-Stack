import Banner from "../homepageComponents/Banner";
import Features from "../homepageComponents/Features";
import  Video from "../homepageComponents/Video";
import Footer from "../homepageComponents/Footer";
function RootPage() {
    return (
        <div>
           {/* <NavLinks /> */}
           <section id="banner">
                <Banner />
           </section>
            <section id="features">
                <Features />
            </section>
            <section id="demoVedio">
                <Video />
            </section>
            <section >
                <Footer />
            </section>
        </div>
    )
}

export default RootPage;