import "../css/constants.css";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Competencies from "../components/Competencies";
import Presentation from "../components/Presentation";
import About from "../components/About";
import Footer from "../components/Footer";
import Experience from "../components/Experience";
import Transition from "../components/Transition";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScreenSize from "../components/ScreenSize";

function MainContent({ language, setLanguage, backendApiUrl }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <div className={"bg-neutral-900 relative"}>
                <Navbar backendApiUrl={backendApiUrl} language={language} setLanguage={setLanguage} />
            </div>
            <div className={"bg-neutral-900 relative z-10"}>
                <Presentation backendApiUrl={backendApiUrl} language={language} />
                <div className={"py-28 bg-neutral-900"}>
                    <About backendApiUrl={backendApiUrl} language={language} />
                </div>
                <Competencies backendApiUrl={backendApiUrl} language={language} />
                <Experience backendApiUrl={backendApiUrl} language={language} />
                <Projects backendApiUrl={backendApiUrl} language={language} />
            <Contact backendApiUrl={backendApiUrl} language={language} />
            </div>
            <Footer backendApiUrl={backendApiUrl} language={language} />
            {/*<ScreenSize/>*/}
        </motion.div>
    );
}

function Home({ language, setLanguage, backendApiUrl }) {
    const [isTransitionVisible, setIsTransitionVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitionVisible(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {isTransitionVisible ? (
                <Transition />
            ) : (
                <MainContent backendApiUrl={backendApiUrl} language={language} setLanguage={setLanguage}/>
            )}
        </div>
    );
}

export default Home;