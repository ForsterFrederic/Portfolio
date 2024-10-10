"use client";
import "../../../../src/css/constants.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Link,
} from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { Select } from "@/components/ui/select";
import { Dropzone } from "@/components/ui/dropzone";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Define type for project data
type Project = {
    _id: string;
    language: string;
    title: string;
    description: string;
    duration: string;
    technologies: string;
    link: string;
    picture: string;
};

// Define type for form data
type ProjectFormData = Omit<Project, "_id" | "picture"> & {
    picture: File | string;
};

// Component for sortable project items
const SortableProject = ({
                             project,
                             handleEditProject,
                             handleDeleteProject,
                         }: {
    project: Project;
    handleEditProject: (project: Project) => void;
    handleDeleteProject: (id: string) => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-card border p-6 rounded-lg shadow-sm flex flex-col"
        >
            <div className="flex-grow">
                <h3 className="text-center font-bold text-xl">{project.title}</h3>
                <Separator className="mt-4 mb-6 w-11/12 mx-auto" />
                {project.picture && (
                    <div className="relative w-full overflow-hidden">
                        <img
                            className="p-1 w-full h-full object-cover object-top rounded-t"
                            src={project.picture}
                            alt={project.title}
                        />
                        <Separator className="my-6 w-11/12 mx-auto" />
                    </div>
                )}
                <p className="mb-1">{project.description}</p>
                <p className="mb-1">{project.duration}</p>
                <p className="mb-1">{project.technologies}</p>
                <Link className="cursor-pointer underline underline-offset-4" onClick={() => window.open(project.link)}>
                    {project.link}
                </Link>
            </div>
            <Separator className="my-6 w-11/12 mx-auto" />
            <div className="flex justify-evenly">
                <Button color="secondary" className="w-24 rounded-lg font-bold" onClick={() => handleDeleteProject(project._id)}>
                    Delete
                </Button>
                <Button color="secondary" className="w-24 rounded-lg font-bold" onClick={() => handleEditProject(project)}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default function Private() {
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [projects, setProjects] = useState<Project[]>([]);
    const [file, setFile] = useState<File | string | null>(null);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [projectData, setProjectData] = useState<ProjectFormData>({
        language: "EN",
        title: "",
        description: "",
        duration: "",
        technologies: "",
        link: "",
        picture: "",
    });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Project[]>(`${BACKEND_API_URL}/project/EN`);
            if (response.data.length === 0)
                setError("No projects found");
            const newItems = response.data.map((item) => ({
                ...item,
                picture: item.picture ? `${BACKEND_API_URL.replace("/api", "")}/${item.picture}` : "",
            }));
            setProjects(newItems);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setError("Error fetching projects");
        } finally {
            setLoading(false);
        }
    };

    const handleProjectSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(projectData).forEach((key) => {
            formData.append(key, projectData[key as keyof typeof projectData] as string);
        });
        if (file) {
            formData.append("picture", file);
        }

        setLoading(true);
        try {
            if (projectId) {
                await axios.put(`${BACKEND_API_URL}/project/${projectId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post(`${BACKEND_API_URL}/project`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            resetForm();
            fetchProjects();
        } catch (error) {
            console.error("Error submitting project:", error);
            setError("Error submitting project");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${BACKEND_API_URL}/project/${id}`);
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
            setError("Error deleting project");
        } finally {
            setLoading(false);
        }
    };

    const handleEditProject = (project: Project) => {
        setProjectId(project._id);
        setProjectData({
            language: project.language,
            title: project.title,
            description: project.description,
            duration: project.duration,
            technologies: project.technologies,
            link: project.link,
            picture: project.picture,
        });
        setFile(project.picture);
        onOpen();
    };

    const resetForm = () => {
        setProjectId(null);
        setProjectData({
            language: "EN",
            title: "",
            description: "",
            duration: "",
            technologies: "",
            link: "",
            picture: "",
        });
        setFile(null);
        setError("");
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            const sourceIndex = projects.findIndex((project) => project._id === active.id);
            const targetIndex = projects.findIndex((project) => project._id === over.id);

            if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
                const updatedProjects = arrayMove(projects, sourceIndex, targetIndex);
                setProjects(updatedProjects);
            }
        }
    };

    useEffect(() => {
        if (!isOpen) resetForm();
    }, [isOpen]);

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <div className={"flex flex-wrap gap-6 justify-between mt-6 px-10"}>
                <Button onPress={onOpen} color="secondary" className={"rounded-lg font-bold"}>
                    Create Project
                </Button>
                <h1 className="text-center font-extrabold text-2xl text-foreground content-end justify-center">
                    MANAGE PROJECTS
                </h1>
                <div className={"my-auto font-bold"}>{projects.length + " Projects"}</div>
            </div>

            {isOpen && <div className="modal-backdrop" onClick={onClose}></div>}

            <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" className="modal">
                <ModalContent className={"p-6 w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm"}>
                    <ModalHeader className={"font-bold"}>
                        {projectId ? "UPDATE A PROJECT" : "CREATE NEW PROJECT"}
                    </ModalHeader>
                    <Separator className={"mt-1 mb-5"} />
                    <form onSubmit={handleProjectSubmit}>
                        <ModalBody>
                            <Select
                                value={projectData.language}
                                onChange={(e) => setProjectData({...projectData, language: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            >
                                <option value="EN">EN</option>
                                <option value="FR">FR</option>
                                <option value="DE">DE</option>
                            </Select>
                            <Input
                                type="text"
                                placeholder="Project Title"
                                value={projectData.title}
                                onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={projectData.description}
                                onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Duration"
                                value={projectData.duration}
                                onChange={(e) => setProjectData({...projectData, duration: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Technologies"
                                value={projectData.technologies}
                                onChange={(e) => setProjectData({...projectData, technologies: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="url"
                                placeholder="Project Link"
                                value={projectData.link}
                                onChange={(e) => setProjectData({...projectData, link: e.target.value})}
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Dropzone onChange={(file) => setFile(file)} initialFile={file}/>
                        </ModalBody>
                        <Separator className={"mb-4 mt-6"}/>
                        <ModalFooter className={"flex justify-between"}>
                            <Button color="secondary" className={"rounded-lg w-44"} onPress={onClose}>Close</Button>
                            <Button type="submit" color="secondary" className={"rounded-lg w-44"}
                                    onPress={onClose}>{projectId ? 'Update Project' : 'Create Project'}</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <Separator className="my-6 w-11/12 mx-auto" />

            {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
            {loading && <p className="mt-6 text-center">Loading...</p>}

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map((project) => project._id)} strategy={rectSortingStrategy}>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                        {projects.map((project) => (
                            <SortableProject
                                key={project._id}
                                project={project}
                                handleEditProject={handleEditProject}
                                handleDeleteProject={handleDeleteProject}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
