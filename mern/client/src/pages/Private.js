import "../css/constants.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Private({ backendApiUrl }) {
    const [primaryColor, setPrimaryColor] = useState({
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#58dc34',
        primaryHover: getComputedStyle(document.documentElement).getPropertyValue('--primary-hover').trim() || '#58dc34'
    });
    const [response, setResponse] = useState("Server not tested yet.");
    const [projects, setProjects] = useState([]);
    const [file, setFile] = useState(null);
    const [projectId, setProjectId] = useState(null); // State to hold the ID of the project to be updated
    const [projectData, setProjectData] = useState({
        language: 'EN',
        title: '',
        description: '',
        duration: '',
        technologies: '',
        link: ''
    });

    const navigate = useNavigate();

    // Function to fetch all projects based on language
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/project/EN`); // Replace 'EN' with the desired language if necessary
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // Function to create or update a project
    const handleProjectSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('language', projectData.language);
        formData.append('title', projectData.title);
        formData.append('description', projectData.description);
        formData.append('duration', projectData.duration);
        formData.append('technologies', projectData.technologies);
        formData.append('link', projectData.link);
        if (file) {
            formData.append('picture', file);
        }

        try {
            if (projectId) {
                // Update existing project
                await axios.put(`${backendApiUrl}/project/${projectId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Create new project
                await axios.post(`${backendApiUrl}/project`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setProjectId(null); // Reset projectId after submission
            setProjectData({
                language: 'EN',
                title: '',
                description: '',
                duration: '',
                technologies: '',
                link: ''
            });
            setFile(null); // Reset the file input
            fetchProjects(); // Refresh the project list
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    };

    // Function to delete a project
    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`${backendApiUrl}/project/${id}`);
            fetchProjects(); // Refresh the project list after deletion
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    // Function to set the project data for editing
    const handleEditProject = (project) => {
        setProjectId(project._id);
        setProjectData({
            language: project.language,
            title: project.title,
            description: project.description,
            duration: project.duration,
            technologies: project.technologies,
            link: project.link
        });
    };

    useEffect(() => {
        fetchProjects(); // Fetch projects when the component mounts
    }, []);

    return (
        <div className="flex flex-col items-center h-svh px-10 bg-gray-100">
            <h1 className="text-center font-extrabold text-3xl mb-6 text-gray-800">Project Management</h1>
            <form onSubmit={handleProjectSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <input
                    type="text"
                    placeholder="Project Title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Duration"
                    value={projectData.duration}
                    onChange={(e) => setProjectData({ ...projectData, duration: e.target.value })}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Technologies"
                    value={projectData.technologies}
                    onChange={(e) => setProjectData({ ...projectData, technologies: e.target.value })}
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <input
                    type="url"
                    placeholder="Project Link"
                    value={projectData.link}
                    onChange={(e) => setProjectData({ ...projectData, link: e.target.value })}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*" // Accept image files only
                    className="mb-4"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                    {projectId ? 'Update Project' : 'Create Project'}
                </button>
            </form>

            <h2 className="text-center font-bold mt-6 text-2xl text-gray-800">Existing Projects</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-4xl">
                {projects.map((project) => (
                    <li key={project._id} className="bg-white p-4 rounded shadow-md">
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-gray-700 mb-2">{project.description}</p>
                        <div className="flex justify-between">
                            <button onClick={() => handleEditProject(project)} className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition duration-200 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDeleteProject(project._id)} className="text-red-500 border border-red-500 p-1 rounded hover:bg-red-500 hover:text-white transition duration-200">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
