import "../../css/constants.css"
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Development() {
    const [response, setResponse] = useState("Server not tested yet.");
    const navigate = useNavigate();
    const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3001/api";

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

    return (
        <div>
            {/*<Navbar/>*/}
            <div style={styles.container}>
                <div style={styles.responseContainer}>
                    <h1 className={"text-center font-extrabold text-2xl"}>Server Test</h1>
                    <p>{response}</p>
                    <div className={"flex flex-col"}>
                        <button style={styles.button} onClick={() => navigate("/projects")}>View sample projects</button>
                        <button style={styles.button} onClick={() => navigate("/colors")}>View color palette</button>
                    </div>
                </div>
                <div style={styles.messageContainer}>
                    <p style={styles.message}>
                        Development of Frédéric Forster's portfolio is in progress.
                    </p>
                </div>
                <div className={"primary-light w-20 h-20 rounded flex-center"}>
                    test
                </div>
                <button className={"btn mt-6"} onClick={() => navigate('/developpment-card')}>Test button</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: "var(--White)",
    },
    responseContainer: {
        marginBottom: '100px',
        textAlign: 'center',
    },
    messageContainer: {
        textAlign: 'center',
    },
    title: {
        fontSize: '20px',
        marginBottom: '20px',
        color: '#333',
    },
    message: {
        color: "black",
        fontSize: '40px',
        fontWeight: 'bold',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        marginTop: "30px",
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    'button:hover': {
        backgroundColor: '#0056b3',
    },
};