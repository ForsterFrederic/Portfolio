import "../../css/constants.css";
import {useEffect, useState} from "react";
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
            const response = await api.post('/projects', { name: 'Sample project #'+(projects.length+1) });
            setProjects([...projects, response.data]);
        } catch (error) {
            console.error('Failed to add project', error);
        }
    }

    return (
        <div>
            <h1>Projects</h1>
            <p>Projects number: {projects.length}</p>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
            <button onClick={() => addProject()}>Add a sample project</button>
        </div>
    );
};