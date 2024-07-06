import "../../css/constants.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Private() {
    const [primaryColor, setPrimaryColor] = useState({
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#58dc34',
        primaryHover: getComputedStyle(document.documentElement).getPropertyValue('--primary-hover').trim() || '#58dc34'
    });
    const [response, setResponse] = useState("Server not tested yet.");
    const navigate = useNavigate();
    const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "https://frederic-forster.com/api";

    useEffect(() => {
        const testServer = async () => {
            try {
                const response = await axios.get(BACKEND_API_URL + "/test");
                setResponse(response.data);
            } catch (error) {
                setResponse("Failed to test the server.");
                console.error('Failed to test the server', error);
            }
        };

        testServer();
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--primary', primaryColor.primary);
        document.documentElement.style.setProperty('--primary-hover', primaryColor.primaryHover);

        const testServer = async () => {
            try {
                const response = await axios.get(BACKEND_API_URL + "/test");
                setResponse(response.data);
            } catch (error) {
                setResponse("Failed to test the server.");
                console.error('Failed to test the server', error);
            }
        };

        testServer();
    }, [primaryColor.primary, primaryColor.primaryHover, BACKEND_API_URL]);

    const handleColorChange = (event) => {
        const newColor = JSON.parse(event.target.value);
        setPrimaryColor(newColor);
        localStorage.setItem('primaryColor', newColor.primary);
        localStorage.setItem('primaryHoverColor', newColor.primaryHover);
        document.documentElement.style.setProperty('--primary', newColor.primary);
        document.documentElement.style.setProperty('--primary-hover', newColor.primaryHover);
    };

    const getCSSVariableValue = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    return (
        <div>
            <div className={"flex-col-center items-center h-svh"}>
                <div>
                    <h1 className={"text-center font-extrabold text-2xl"}>Server Test</h1>
                    <p>{response}</p>
                    <div className={"flex flex-col"}>
                        <button className={"btn mt-6"} onClick={() => navigate("/projects")}>View sample projects</button>
                        <button className={"btn mt-3"} onClick={() => navigate("/colors")}>View color palette</button>
                    </div>
                    <div className={"mt-10"}>
                        <p>Primary color:</p>
                        <div className={"flex-center mt-2"}>
                            <select className="w-8/12 mr-4" value={JSON.stringify(primaryColor)} onChange={handleColorChange}>
                                <option value={JSON.stringify({primary: getCSSVariableValue('--my-blue'), primaryHover: getCSSVariableValue('--my-blue-hover')})}>Blue</option>
                                <option value={JSON.stringify({primary: getCSSVariableValue('--my-orange'), primaryHover: getCSSVariableValue('--my-orange-hover')})}>Orange</option>
                                <option value={JSON.stringify({primary: getCSSVariableValue('--my-purple'), primaryHover: getCSSVariableValue('--my-purple-hover')})}>Purple</option>
                                <option value={JSON.stringify({primary: getCSSVariableValue('--my-pink'), primaryHover: getCSSVariableValue('--my-pink-hover')})}>Pink</option>
                            </select>
                            <div className="w-12 h-12" style={{ backgroundColor: primaryColor.primary, borderRadius: '0.25rem' }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};