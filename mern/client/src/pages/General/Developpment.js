import "../../css/constants.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Developpment() {
    const [response, setResponse] = useState("Server not tested yet.");

    useEffect(() => {
        const testServer = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
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
            <h1>Server test:</h1>
            <p>{response}</p>
        </div>
    );
};
