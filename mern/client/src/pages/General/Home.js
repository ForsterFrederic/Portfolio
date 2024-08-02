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

export default function Home() {
    return (
        <div>
            <Navbar/>
            <Presentation/>
            <About/>
            <Competencies/>
            <Experience/>
            <Projects/>
            <Contact/>
            <Footer/>
            <ScreenSize/>
        </div>
    );
};