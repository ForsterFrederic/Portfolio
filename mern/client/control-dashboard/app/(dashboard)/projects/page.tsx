"use client";
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
import { Separator } from "@/app/components/ui/separator";
import { Select } from "@/app/components/ui/select";
import { Dropzone } from "@/app/components/ui/dropzone";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Textarea} from "@/app/components/ui/textarea";

type Project = {
    _id: string;
    language: string;
    title: string;
    description: string;
    duration: string;
    technologies: string;
    link: string;
    picture: string;
    position: number;
};

type ProjectFormData = Omit<Project, "_id" | "picture"> & {
    picture: File | string;
};

const SortableProject = ({
                             project,
                             handleEditProject,
                             handleDeleteProject,
                             dragEnabled,
                         }: {
    project: Project;
    handleEditProject: (project: Project) => void;
    handleDeleteProject: (id: string) => void;
    dragEnabled: boolean;
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
            {...(dragEnabled ? { ...attributes, ...listeners } : {})}
            className="bg-card border p-6 rounded-lg shadow-sm flex flex-col"
        >
            <div className="flex-grow">
                <h3 className="text-center font-bold text-xl">{project.title}</h3>
                {!dragEnabled && (
                    <div><Separator className="mt-4 mb-6 w-11/12 mx-auto" />
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
                    </Link></div>
                )}
            </div>
            {!dragEnabled && (<Separator className="my-6 w-11/12 mx-auto" />)}
            {!dragEnabled && (
                <div className="flex justify-center gap-4">
                    <Button color="secondary" className="w-32 font-bold bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50" onClick={() => handleDeleteProject(project._id)}>
                        Delete
                    </Button>
                    <Button color="secondary" className="w-32 font-bold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50" onClick={() => handleEditProject(project)}>
                        Edit
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function Projects() {
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [projectsEN, setProjectsEN] = useState<Project[]>([]);
    const [projectsFR, setProjectsFR] = useState<Project[]>([]);
    const [projectsDE, setProjectsDE] = useState<Project[]>([]);
    const [file, setFile] = useState<File | string | null>(null);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [dragEnabled, setDragEnabled] = useState(false);
    const [projectData, setProjectData] = useState<ProjectFormData>({
        language: "EN",
        title: "",
        description: "",
        duration: "",
        technologies: "",
        link: "",
        picture: "",
        position: 0,
    });

    const handleToggleDrag = () => {
        setDragEnabled((prev) => !prev);
    };

    const fetchProjects = async (language: string, setExperience: any) => {
        setLoading(true);
        try {
            const response = await axios.get<Project[]>(`${BACKEND_API_URL}/project/` + language);
            if (response.status === 200 && response.data.length > 0) {
                const sortedProjects = response.data
                    .map((item) => {
                        const pictureUrl = item.picture
                            ? `${BACKEND_API_URL.replace("/api", "")}/${item.picture.replace('/root/apps/portfolio/dest/mern/server/', '')}`
                            : "";
                        return { ...item, picture: pictureUrl };
                    })
                    .sort((a, b) => a.position - b.position);
                setExperience(sortedProjects);
            } else if (response.status === 404) {
                console.error("No " + language + " projects found.")
                setExperience([]);
            }
        } catch (error: any) {
            setExperience([]);
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProjectSubmit = async (event?: React.FormEvent) => {
        if (!projectId)
            projectData.position =
                projectData.language === "EN" ? projectsEN.length :
                    projectData.language === "FR" ? projectsFR.length :
                        projectData.language === "DE" ? projectsDE.length :
                            0;
        event?.preventDefault();
        const formData = new FormData();
        Object.keys(projectData).forEach((key) => {
            formData.append(key, projectData[key as keyof typeof projectData] as string);
        });
        if (file) {
            formData.append("picture", file);
        }

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
            fetchProjects("EN", setProjectsEN);
            fetchProjects("FR", setProjectsFR);
            fetchProjects("DE", setProjectsDE);
        } catch (error) {
            console.error("Error submitting project:", error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await axios.delete(`${BACKEND_API_URL}/project/${id}`);
            fetchProjects("EN", setProjectsEN);
            fetchProjects("FR", setProjectsFR);
            fetchProjects("DE", setProjectsDE);
        } catch (error) {
            console.error("Error deleting project:", error);
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
            position: project.position,
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
            position: 0,
        });
        setFile(null);
    };

    const editProjectOrder = async (project: any)=> {
        const formData = new FormData();

        Object.keys(project).forEach((key) => {
            formData.append(key, project[key as keyof typeof project] as string);
        });
        try {
            await axios.put(`${BACKEND_API_URL}/project/${project._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchProjects("EN", setProjectsEN);
            fetchProjects("FR", setProjectsFR);
            fetchProjects("DE", setProjectsDE);
        } catch (error) {
            console.error("Error changing projects order:", error);
        }
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        let languageSet: typeof projectsEN | undefined;
        let setLanguageExperience: typeof setProjectsEN | undefined;

        if (projectsEN.some(project => project._id === active.id)) {
            languageSet = projectsEN;
            setLanguageExperience = setProjectsEN;
        } else if (projectsFR.some(project => project._id === active.id)) {
            languageSet = projectsFR;
            setLanguageExperience = setProjectsFR;
        } else if (projectsDE.some(project => project._id === active.id)) {
            languageSet = projectsDE;
            setLanguageExperience = setProjectsDE;
        }

        if (over && languageSet && setLanguageExperience) {
            const sourceIndex = languageSet.findIndex((project) => project._id === active.id);
            const targetIndex = languageSet.findIndex((project) => project._id === over.id);

            if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
                const updatedProjects = arrayMove(languageSet, sourceIndex, targetIndex);

                updatedProjects.forEach((project, index) => {
                    project.position = index;
                });

                try {
                    await Promise.all(
                        updatedProjects.map((project) => editProjectOrder(project))
                    );
                    setLanguageExperience(updatedProjects);
                } catch (error) {
                    console.error("Error updating projects:", error);
                }
            }
        }
    };

    interface ProjectProps {
        projects: any[];
    }

    const DisplayCards = ({ projects }: ProjectProps) => {
        return (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map((project) => project._id)} strategy={rectSortingStrategy}>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                        {projects.map((project) => (
                            <SortableProject
                                key={project._id}
                                project={project}
                                handleEditProject={handleEditProject}
                                handleDeleteProject={handleDeleteProject}
                                dragEnabled={dragEnabled}
                                setDragEnabled={setDragEnabled}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        );
    };

    useEffect(() => {
        if (!isOpen)
            resetForm();
    }, [isOpen]);

    useEffect(() => {
        fetchProjects("EN", setProjectsEN);
        fetchProjects("FR", setProjectsFR);
        fetchProjects("DE", setProjectsDE);
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading Projects...</div>;
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6 px-4 md:px-14">
                <h1 className="text-center font-extrabold text-2xl text-foreground w-full md:w-auto">
                    MANAGE PROJECTS
                </h1>
                <div className="flex flex-col w-full md:w-auto md:flex-row items-center gap-4">
                    <div className="text-xs font-bold text-center w-full md:w-auto">
                        {`EN(${projectsEN.length}) FR(${projectsFR.length}) DE(${projectsDE.length})`}
                    </div>
                    <Button onPress={onOpen} color="secondary" className="font-bold w-full md:w-44 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50">
                        Create Project
                    </Button>
                </div>
            </div>

            {isOpen && <div className="modal-backdrop" onClick={onClose}></div>}

            <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" className="modal">
                <ModalContent className={"p-6 w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm max-h-[95%] overflow-auto"}>
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
                                className="border text-sm border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Textarea
                                placeholder="Description"
                                value={projectData.description}
                                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg p-2"
                            />
                            <Input
                                type="text"
                                placeholder="Duration"
                                value={projectData.duration}
                                onChange={(e) => setProjectData({...projectData, duration: e.target.value})}
                                required
                                className="border text-sm border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Textarea
                                placeholder="Technologies"
                                value={projectData.technologies}
                                onChange={(e) => setProjectData({ ...projectData, technologies: e.target.value })}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg p-2"
                            />
                            <Input
                                type="url"
                                placeholder="Project Link"
                                value={projectData.link}
                                onChange={(e) => setProjectData({...projectData, link: e.target.value})}
                                className="border text-sm border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Dropzone onChange={(file) => setFile(file)} initialFile={file}/>
                        </ModalBody>
                        <Separator className={"mb-4 mt-6"}/>
                        <ModalFooter className={"flex justify-between"}>
                            <Button color="secondary" className={"w-44 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"} onPress={onClose}>Close</Button>
                            <Button type="submit" color="secondary" className={"w-44 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"}
                                    onPress={onClose}>{projectId ? 'Update Project' : 'Create Project'}</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <div className={"px-4 md:pl-14 mt-4 w-full md:w-auto"}>
                <Button onClick={handleToggleDrag}  color="secondary" className="font-bold w-full md:w-44 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50">
                    {dragEnabled ? "Stop Reorder" : "Reorder"}
                </Button>
            </div>
            <div className="w-full pt-6 pb-12">
                <div className="flex items-center justify-center mb-12 gap-1 px-6">
                    <p className="text-xl font-semibold w-max">{`EN`}</p>
                    <p className="text-xl font-semibold w-max">{`(${projectsEN.length})`}</p>
                    <Separator className="ml-2 w-11/12 bg-neutral-500" />
                </div>
                <DisplayCards projects={projectsEN} />

                <div className="flex items-center justify-center mb-12 gap-1 px-6">
                    <p className="text-xl font-semibold w-max">{`FR`}</p>
                    <p className="text-xl font-semibold w-max">{`(${projectsFR.length})`}</p>
                    <Separator className="ml-2 w-11/12 bg-neutral-500" />
                </div>
                <DisplayCards projects={projectsFR} />

                <div className="flex items-center justify-center mb-12 gap-1 px-6">
                    <p className="text-xl font-semibold w-max">{`DE`}</p>
                    <p className="text-xl font-semibold w-max">{`(${projectsDE.length})`}</p>
                    <Separator className="ml-2 w-11/12 bg-neutral-500" />
                </div>
                <DisplayCards projects={projectsDE} />
            </div>
        </div>
    );
}
