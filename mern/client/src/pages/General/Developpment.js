import "../../css/constants.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Development() {
    const [response, setResponse] = useState("Server not tested yet.");
    const navigate = useNavigate();

    useEffect(() => {
        const testServer = async () => {
            try {
                const response = await axios.get('https://frederic-forster.com/test');
                setResponse(response.data);
            } catch (error) {
                setResponse("Failed to test the server.");
                console.error('Failed to test the server', error);
            }
        };

        testServer();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.responseContainer}>
                <h1 style={styles.title}>Server Test</h1>
                <p>{response}</p>
                <button style={styles.projectsButton} onClick={() => navigate("/projects")}>View sample projects</button>
            </div>
            <div style={styles.messageContainer}>
                <p style={styles.message}>
                    Development of Frédéric Forster's portfolio is in progress.
                </p>
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
        backgroundColor: '#f5f5f5',
        padding: '20px',
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
    projectsButton: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    'projectsButton:hover': {
        backgroundColor: '#0056b3',
    },
};