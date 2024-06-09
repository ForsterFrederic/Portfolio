import "../../css/constants.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Development() {
    const [response, setResponse] = useState("Server not tested yet.");

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
            <h1 style={styles.title}>Server Test</h1>
            <p>{response}</p>
            <p style={styles.message}>
                Development of Frédéric Forster's portfolio is in progress. Please come back later.
            </p>
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
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    message: {
        fontSize: '18px',
        color: '#666',
        textAlign: 'center',
    },
};
