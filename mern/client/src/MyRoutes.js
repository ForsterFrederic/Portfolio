import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Development from "./pages/Development";
import Home from "./pages/Home";
import ProjectsScreenshots from "./components/ProjectsScreenshots";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export function MyRoutes() {
    const [language, setLanguage] = useState("EN");
    const [geoData, setGeoData] = useState(null);
    const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "https://frederic-forster.com/api";
    const location = useLocation();
    const [isDevelopment, setIsDevelopment] = useState(false);
    const isPrivatePath = location.pathname === '/private';
    const navigate = useNavigate();

    const getDeviceType = () => {
        const userAgent = navigator.userAgent;
        if (/mobile/i.test(userAgent)) {
            return "mobile";
        }
        return "desktop";
    };

    const incrementCounter = async () => {
        if (!geoData)
            return;

        const device = getDeviceType();

        try {
            await axios.post(`${BACKEND_API_URL}/counter`, {
                localisation: geoData,
                device: device,
            });
        } catch (error) {
            console.error("Error incrementing counter:", error);
        }
    };

    const getSettings = async () => {
        try {
            const res = await axios.get(`${BACKEND_API_URL}/settings`);
            setIsDevelopment(res.data.development);
        } catch (error) {
            console.error("Error getting settings:", error);
        }
    };

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const ipResponse = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipResponse.json();
                const userIP = ipData.ip;

                const geoResponse = await fetch(`https://ipinfo.io/${userIP}/json?token=720b96cc837ec3`);
                const geoData = await geoResponse.json();

                geoData.date = new Intl.DateTimeFormat('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Paris',
                }).format(new Date()).toString();

                if (geoData.country === "FR") {
                    setLanguage("FR");
                } else if (geoData.country === "DE") {
                    setLanguage("DE");
                }

                setGeoData(geoData);
            } catch (error) {
                console.error("Error fetching geolocation data:", error);
            }
        };

        fetchCountry();
    }, []);

    useEffect(() => {
        if (!geoData) return;

        const path = location.pathname;

        if (path === "/private" && process.env.REACT_APP_IS_PROD === "FALSE") {
            window.location.href = "http://localhost:3003/home";
        } else if (path !== "/no" && process.env.REACT_APP_IS_DEVELOPMENT === "FALSE") {
            incrementCounter();
        } if (path === "/settings/development") {
            axios.get(`${BACKEND_API_URL}/settings/development`)
            navigate("/")
        }
    }, [geoData, location.pathname]);

    useEffect(() => {
        getSettings()
    }, []);

    return (
        isDevelopment ?
            <Routes>
                <Route path="/home" element={<Home language={language} setLanguage={setLanguage} backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/generate-screenshots" element={<ProjectsScreenshots backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/" element={<Development/>}/>
                <Route
                    path="*"
                    element={
                        isPrivatePath ? null : <NotFoundPage language={language} />
                    }
                />
            </Routes>
            :
            <Routes>
                <Route path="/development" element={<Development/>}/>
                <Route path="/generate-screenshots" element={<ProjectsScreenshots backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/" element={<Home language={language} setLanguage={setLanguage} backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/no" element={<Home language={language} setLanguage={setLanguage} backendApiUrl={BACKEND_API_URL}/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path="/terms" element={<Terms/>}/>
                <Route
                    path="*"
                    element={
                        isPrivatePath ? null : <NotFoundPage language={language} />
                    }
                />
            </Routes>
    );
}

export default MyRoutes;
