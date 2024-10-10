import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Private from "./pages/Private";
import Development from "./pages/Development";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";

export function MyRoutes() {
    const [language, setLanguage] = useState("EN");
    const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "https://frederic-forster.com/api";
    const location = useLocation();

    const incrementCounter = async () => {
        try {
            await axios.post(`${BACKEND_API_URL}/counter`);
        } catch (error) {
            console.error('Error incrementing counter:', error);
        }
    };

    useEffect(() => {
        const path = location.pathname;

        if (path === '/private') {
            window.location.href = 'http://localhost:3002/';
        } else if (path !== '/privatee' && path !== '/no' && process.env.REACT_APP_IS_DEVELOPMENT === "FALSE") {
            incrementCounter();
        }
    }, []);

    return (
        process.env.REACT_APP_IS_DEVELOPMENT === "TRUE" ?
            <Routes>
                <Route path="/privatee" element={<Private backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/home" element={<Home language={language} setLanguage={setLanguage} backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/" element={<Development/>}/>
            </Routes>
            :
            <Routes>
                <Route path="/privatee" element={<Private backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/development" element={<Development/>}/>
                <Route path="/" element={<Home language={language} setLanguage={setLanguage} backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/no" element={<Home language={language} setLanguage={setLanguage} backendApiUrl={BACKEND_API_URL}/>}/>
            </Routes>
    );
}

export default MyRoutes;
