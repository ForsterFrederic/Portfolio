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

type Experience = {
    _id: string;
    language: string;
    company: string;
    title: string;
    duration: string;
    description: string;
    technologies: string;
    url: string;
    position: number;
};

type ExperienceFormData = Omit<Experience, "_id">

const SortableExperience = ({
                             experience,
                             handleEditExperience,
                             handleDeleteExperience,
                         }: {
    experience: Experience;
    handleEditExperience: (experience: Experience) => void;
    handleDeleteExperience: (id: string) => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: experience._id });

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
                <h3 className="text-center font-bold text-xl">{experience.company}</h3>
                <Separator className="mt-4 mb-6 w-11/12 mx-auto" />
                <p className="mb-1">{experience.title}</p>
                <p className="mb-1">{experience.duration}</p>
                <p className="mb-1">{experience.description}</p>
                <p className="mb-1">{experience.technologies}</p>
                <Link className="cursor-pointer underline underline-offset-4" onClick={() => window.open(experience.url)}>
                    {experience.url}
                </Link>
            </div>
            <Separator className="my-6 w-11/12 mx-auto" />
            <div className="flex justify-evenly">
                <Button color="secondary" className="w-24 rounded-lg font-bold" onClick={() => handleDeleteExperience(experience._id)}>
                    Delete
                </Button>
                <Button color="secondary" className="w-24 rounded-lg font-bold" onClick={() => handleEditExperience(experience)}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default function Experiences() {
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [experienceId, setExperienceId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [experienceData, setExperienceData] = useState<ExperienceFormData>({
        language: "EN",
        company: "",
        title: "",
        duration: "",
        description: "",
        technologies: "",
        url: "",
        position: 0,
    });

    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Experience[]>(`${BACKEND_API_URL}/experience/`);
            if (response.status === 200 && response.data.length > 0) {
                const sortedExperiences = response.data.sort((a, b) => a.position - b.position);
                setExperiences(sortedExperiences);
            } else if (response.status === 404) {
                setExperiences([]);
                setError("No experiences found");
            }
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.error || 'Error fetching experiences');
            } else {
                setError('Error fetching experiences');
            }
            setExperiences([]);
            console.error('Error fetching experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExperienceSubmit = async (event?: React.FormEvent) => {
        if (!experienceId) experienceData.position = experiences.length;
        event?.preventDefault();

        setLoading(true);
        try {
            if (experienceId) {
                await axios.put(`${BACKEND_API_URL}/experience/${experienceId}`, experienceData, {
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                await axios.post(`${BACKEND_API_URL}/experience`, experienceData, {
                    headers: { "Content-Type": "application/json" },
                });
            }
            resetForm();
            fetchExperiences();
        } catch (error) {
            console.error("Error submitting experience:", error);
            setError("Error submitting experience");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExperience = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${BACKEND_API_URL}/experience/${id}`);
            fetchExperiences();
        } catch (error) {
            console.error("Error deleting experience:", error);
            setError("Error deleting experience");
        } finally {
            setLoading(false);
        }
    };

    const handleEditExperience = (experience: Experience) => {
        setExperienceId(experience._id);
        setExperienceData({
            language: experience.language,
            company: experience.company,
            title: experience.title,
            duration: experience.duration,
            description: experience.description,
            technologies: experience.technologies,
            url: experience.url,
            position: experience.position,
        });
        onOpen();
    };

    const resetForm = () => {
        setExperienceId(null);
        setExperienceData({
            language: "EN",
            company: "",
            title: "",
            duration: "",
            description: "",
            technologies: "",
            url: "",
            position: 0,
        });
        setError("");
    };

    const editExperienceOrder = async (experience) => {
        try {
            // Check that the experience object being sent is correct
            console.log("Updating experience:", experience);
            await axios.put(`${BACKEND_API_URL}/experience/${experience._id}`, experience, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Error changing experience order:", error);
            setError("Error changing experience order");
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            const sourceIndex = experiences.findIndex((experience) => experience._id === active.id);
            const targetIndex = experiences.findIndex((experience) => experience._id === over.id);

            if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
                const updatedExperiences = arrayMove(experiences, sourceIndex, targetIndex);

                // Ensure that position is updated consistently
                updatedExperiences.forEach((experience, index) => {
                    experience.position = index; // Always update position in the correct order
                });

                try {
                    // Send all updated experiences to the server at once
                    await Promise.all(
                        updatedExperiences.map((experience) => editExperienceOrder(experience))
                    );
                    setExperiences(updatedExperiences); // Update the state after successful sync
                } catch (error) {
                    console.error("Error updating experiences:", error);
                    setError("Error updating experiences");
                }
            }
        }
    };


    useEffect(() => {
        if (!isOpen) resetForm();
    }, [isOpen]);

    useEffect(() => {
        fetchExperiences();
    }, []);

    return (
        <div>
            <div className={"flex flex-wrap gap-6 justify-between mt-6 px-14"}>
                <Button onPress={onOpen} color="secondary" className={"rounded-lg font-bold w-44"}>
                    Create Experience
                </Button>
                <h1 className="text-center font-extrabold text-2xl text-foreground content-end justify-center">
                    MANAGE EXPERIENCES
                </h1>
                <div className={"my-auto font-bold w-44 text-right"}>{experiences.length + " Experiences"}</div>
            </div>

            {isOpen && <div className="modal-backdrop" onClick={onClose}></div>}

            <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" className="modal">
                <ModalContent className={"p-6 w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm"}>
                    <ModalHeader className={"font-bold"}>
                        {experienceId ? "UPDATE AN EXPERIENCE" : "CREATE NEW EXPERIENCE"}
                    </ModalHeader>
                    <Separator className={"mt-1 mb-5"} />
                    <form onSubmit={handleExperienceSubmit}>
                        <ModalBody>
                            <Select
                                value={experienceData.language}
                                onChange={(e) => setExperienceData({...experienceData, language: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            >
                                <option value="EN">EN</option>
                                <option value="FR">FR</option>
                                <option value="DE">DE</option>
                            </Select>
                            <Input
                                type="text"
                                placeholder="Company"
                                value={experienceData.company}
                                onChange={(e) => setExperienceData({...experienceData, company: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Title"
                                value={experienceData.title}
                                onChange={(e) => setExperienceData({...experienceData, title: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Duration"
                                value={experienceData.duration}
                                onChange={(e) => setExperienceData({...experienceData, duration: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={experienceData.description}
                                onChange={(e) => setExperienceData({...experienceData, description: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Technologies"
                                value={experienceData.technologies}
                                onChange={(e) => setExperienceData({...experienceData, technologies: e.target.value})}
                                required
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                            <Input
                                type="url"
                                placeholder="Url"
                                value={experienceData.url}
                                onChange={(e) => setExperienceData({...experienceData, url: e.target.value})}
                                className="border border-gray-300 mb-2 w-full rounded-lg"
                            />
                        </ModalBody>
                        <Separator className={"mb-4 mt-6"}/>
                        <ModalFooter className={"flex justify-between"}>
                            <Button color="secondary" className={"rounded-lg w-44"} onPress={onClose}>Close</Button>
                            <Button type="submit" color="secondary" className={"rounded-lg w-44"}
                                    onPress={onClose}>{experienceId ? 'Update Experience' : 'Create Experience'}</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <Separator className="my-6 w-11/12 mx-auto" />

            {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
            {loading && <p className="mt-6 text-center">Loading...</p>}

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={experiences.map((experience) => experience._id)} strategy={rectSortingStrategy}>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                        {experiences.map((experience) => (
                            <SortableExperience
                                key={experience._id}
                                experience={experience}
                                handleEditExperience={handleEditExperience}
                                handleDeleteExperience={handleDeleteExperience}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
