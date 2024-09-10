import "../../css/constants.css"
import Navbar from "../../components/Navbar";
import Contact from "../../components/Contact";
import Projects from "../../components/Projects";
import Competencies from "../../components/Competencies";
import Presentation from "../../components/Presentation";
import ScreenSize from "../../components/ScreenSize";
import About from "../../components/About";
import Footer from "../../components/Footer";
import Experience from "../../components/Experience";
import {useEffect} from "react";

export default function Home() {

    useEffect(() => {
        const updateMinHeight = () => {
            const height = window.innerHeight - 68;
            document.documentElement.style.setProperty('--min-height', `${height}px`);
        };
        updateMinHeight();
        window.addEventListener('resize', updateMinHeight);
        return () => window.removeEventListener('resize', updateMinHeight);
    }, []);

    return (
        <div>
            <Navbar/>
            <Presentation/>
            <About/>
            <Competencies/>
            {/*<Experience/>*/}
            <Projects/>
            <Contact/>
            <Footer/>
            {/*<ScreenSize/>*/}
        </div>
    );
};