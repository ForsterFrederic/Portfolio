import { useEffect, useState } from "react";
import api from "../../api/api-settings";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);
console.log(api)
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
            <p style={styles.projectCount}>Sample projects number: {projects.length}</p>
            <button className={"btn mb-6"} onClick={() => addProject()}>Add a Sample Project</button>
            <ul style={styles.projectList}>
                {projects.map(project => (
                    <li key={project.id} style={styles.projectItem}>{project.name}</li>
                ))}
            </ul>
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
};
