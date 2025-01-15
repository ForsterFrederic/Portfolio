import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const GeneratePicturesPage = ({ backendApiUrl }) => {
    const [status, setStatus] = useState("Starting to generate screenshots...");
    const [loading, setLoading] = useState(true);
    const [urlsToCapture, setUrlsToCapture] = useState([
        { url: "https://frederic-forster.com", projectNumber: 1, status: "not-processed" },
        { url: "https://thomschrama.com", projectNumber: 2, status: "not-processed" },
        { url: "https://test-frederic.fun", projectNumber: 3, status: "not-processed" },
        {
            url: "https://test-frederic.cloud",
            projectNumber: 4,
            status: "not-processed",
            login: {
                url: "https://test-frederic.cloud/login",
                fields: {
                    username: "input[placeholder='Adresse e-mail'].ant-input.css-apn68",
                    password: "input[placeholder='Mot de passe'].ant-input.css-apn68"
                },
                credentials: {
                    username: "forster.frederic@gmail.com",
                    password: "Frederic137*"
                },
                submitButton: "button:has-text('Se connecter')"
            }
        },
        { url: "https://wollenschneider.fr", projectNumber: 5, status: "not-processed" },
        { url: "https://amarebatam.com", projectNumber: 6, status: "not-processed" },
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const generateScreenshots = async () => {
            try {
                let updatedUrls = [...urlsToCapture];
                for (let i = 0; i < urlsToCapture.length; i++) {
                    const { url, projectNumber, status } = updatedUrls[i];

                    if (status === "processed") continue;

                    updatedUrls[i].status = "processing";
                    setStatus(`Generating screenshot for Project ${projectNumber}: ${url}`);

                    await axios.post(`${backendApiUrl}/generate-screenshots`, updatedUrls[i], {
                        headers: { "Content-Type": "application/json" },
                    });

                    updatedUrls[i].status = "processed";

                    await new Promise(resolve => setTimeout(resolve, 1000));
                }

                setUrlsToCapture(updatedUrls);
                setLoading(false);
                setStatus("Screenshots generated successfully!");
                navigate("/");
            } catch (error) {
                console.error("Error during screenshot generation:", error);
                setStatus("An error occurred while generating screenshots.");
                setLoading(false);
            }
        };

        generateScreenshots();
    }, [navigate, backendApiUrl, urlsToCapture]);

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-lg">
                <ul className="space-y-4">
                    {urlsToCapture.map(({ url, projectNumber, status }, index) => {
                        let statusText = "";
                        let statusIcon = null;
                        let statusColor = "";

                        switch (status) {
                            case "processing":
                                statusText = `Processing Project ${projectNumber}: ${url}`;
                                statusIcon = <FaSpinner className="animate-spin text-yellow-500" />;
                                statusColor = "text-yellow-500";
                                break;
                            case "processed":
                                statusText = `Project ${projectNumber} processed: ${url}`;
                                statusIcon = <FaCheckCircle className="text-green-500" />;
                                statusColor = "text-green-500";
                                break;
                            default:
                                statusText = `Not processed yet: ${url}`;
                                statusIcon = null;
                                statusColor = "text-gray-500";
                                break;
                        }

                        return (
                            <li key={index} className={`flex items-center space-x-2 ${statusColor}`}>
                                {statusIcon && <div>{statusIcon}</div>}
                                <div className="flex-1">{statusText}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default GeneratePicturesPage;