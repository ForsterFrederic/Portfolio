import "../css/constants.css"
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Competencies from "../components/Competencies";
import Presentation from "../components/Presentation";
import ScreenSize from "../components/ScreenSize";
import About from "../components/About";
import Footer from "../components/Footer";
import Experience from "../components/Experience";
import {useEffect, useState} from "react";
import Transition from "../components/Transition";
import { motion } from "framer-motion";

export default function Home({ language, setLanguage, backendApiUrl }) {
    const [isTransitionVisible, setIsTransitionVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitionVisible(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);


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
            {isTransitionVisible ? (
                <Transition/>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Navbar backendApiUrl={backendApiUrl} language={language} setLanguage={setLanguage}/>
                    <Presentation backendApiUrl={backendApiUrl} language={language}/>
                    <About backendApiUrl={backendApiUrl} language={language}/>
                    <Competencies backendApiUrl={backendApiUrl} language={language}/>
                    {/*<Experience backendApiUrl={backendApiUrl} language={language}/>*/}
                    <Projects backendApiUrl={backendApiUrl} language={language}/>
                    <Contact backendApiUrl={backendApiUrl} language={language}/>
                    <Footer backendApiUrl={backendApiUrl} language={language}/>
                    {/*<ScreenSize />*/}
                </motion.div>
            )}
        </div>
    );
};