import "../../css/constants.css";
import { useEffect, useState } from "react";
import api from "../../api/api-settings";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    };

    const addProject = async () => {
        try {
            const response = await api.post('/projects', { name: 'Sample project #' + (projects.length + 1) });
            setProjects([...projects, response.data]);
        } catch (error) {
            console.error('Failed to add project', error);
        }
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Projects</h1>
            <p style={styles.projectCount}>Projects number: {projects.length}</p>
            <ul style={styles.projectList}>
                {projects.map(project => (
                    <li key={project.id} style={styles.projectItem}>{project.name}</li>
                ))}
            </ul>
            <button style={styles.addButton} onClick={() => addProject()}>Add a Sample Project</button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    projectCount: {
        fontSize: '18px',
        marginBottom: '20px',
        color: '#666',
    },
    projectList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    projectItem: {
        fontSize: '16px',
        marginBottom: '10px',
        color: '#444',
    },
    addButton: {
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
    'addButton:hover': {
        backgroundColor: '#0056b3',
    },
};
