import "../../css/constants.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Developpment() {
    const [response, setResponse] = useState("Server not tested yet.");

    useEffect(() => {
        const testServer = async () => {
            try {
                const response = await axios.get('https://frederic-forster.com/');
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
            <h1>Server test:</h1>
            <p>{response}</p>
            <p style={styles.text}>
                Le développement du portfolio de Frédéric Forster est en cours, revenez me voir plus tard.
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
        height: '100vh',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '20px',
    },
    text: {
        marginTop: '20px',
        fontSize: '18px',
        color: 'Black',
    },
};