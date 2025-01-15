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
import { Separator } from "@/app/components/ui/separator";
import { Select } from "@/app/components/ui/select";
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
    const [experiencesEN, setExperiencesEN] = useState<Experience[]>([]);
    const [experiencesFR, setExperiencesFR] = useState<Experience[]>([]);
    const [experiencesDE, setExperiencesDE] = useState<Experience[]>([]);
    const [experienceId, setExperienceId] = useState<string | null>(null);
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

    const fetchExperiences = async (language: string, setExperience: any) => {
        setLoading(true);
        try {
            const response = await axios.get<Experience[]>(`${BACKEND_API_URL}/experience/` + language);
            if (response.status === 200 && response.data.length > 0) {
                const sortedExperiences = response.data.sort((a, b) => a.position - b.position);
                setExperience(sortedExperiences);
            } else if (response.status === 404) {
                console.error("No " + language + " experiences found.")
                setExperience([]);
            }
        } catch (err: any) {
            setExperience([]);
            console.error('Error fetching experiences:',err)
        } finally {
            setLoading(false);
        }
    };

    const handleExperienceSubmit = async (event?: React.FormEvent) => {
        if (!experienceId)
            experienceData.position =
                experienceData.language === "EN" ? experiencesEN.length :
                    experienceData.language === "FR" ? experiencesFR.length :
                        experienceData.language === "DE" ? experiencesDE.length :
                            0;
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
            fetchExperiences("EN", setExperiencesEN);
            fetchExperiences("FR", setExperiencesFR);
            fetchExperiences("DE", setExperiencesDE);
        } catch (error) {
            console.error("Error submitting experience:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExperience = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${BACKEND_API_URL}/experience/${id}`);
            fetchExperiences("EN", setExperiencesEN);
            fetchExperiences("FR", setExperiencesFR);
            fetchExperiences("DE", setExperiencesDE);
        } catch (error) {
            console.error("Error deleting experience:", error);
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
    };

    const editExperienceOrder = async (experience: any) => {
        try {
            await axios.put(`${BACKEND_API_URL}/experience/${experience._id}`, experience, {
                headers: { "Content-Type": "application/json" },
            });
            fetchExperiences("EN", setExperiencesEN);
            fetchExperiences("FR", setExperiencesFR);
            fetchExperiences("DE", setExperiencesDE);
        } catch (error) {
            console.error("Error changing experience order:", error);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        let languageSet: typeof experiencesEN | undefined;
        let setLanguageExperience: typeof setExperiencesEN | undefined;

        if (experiencesEN.some(experience => experience._id === active.id)) {
            languageSet = experiencesEN;
            setLanguageExperience = setExperiencesEN;
        } else if (experiencesFR.some(experience => experience._id === active.id)) {
            languageSet = experiencesFR;
            setLanguageExperience = setExperiencesFR;
        } else if (experiencesDE.some(experience => experience._id === active.id)) {
            languageSet = experiencesDE;
            setLanguageExperience = setExperiencesDE;
        }

        if (over && languageSet && setLanguageExperience) {
            const sourceIndex = languageSet.findIndex((experience) => experience._id === active.id);
            const targetIndex = languageSet.findIndex((experience) => experience._id === over.id);

            if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
                const updatedExperiences = arrayMove(languageSet, sourceIndex, targetIndex);

                updatedExperiences.forEach((experience, index) => {
                    experience.position = index;
                });

                try {
                    await Promise.all(
                        updatedExperiences.map((experience) => editExperienceOrder(experience))
                    );
                    setLanguageExperience(updatedExperiences);
                } catch (error) {
                    console.error("Error updating experiences:", error);
                }
            }
        }
    };

    interface ExperienceProps {
        experiences: any[];
    }

    const DisplayCards = ({ experiences }: ExperienceProps) => {
        return (
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
        );
    };

    useEffect(() => {
        if (!isOpen)
            resetForm();
    }, [isOpen]);

    useEffect(() => {
        fetchExperiences("EN", setExperiencesEN);
        fetchExperiences("FR", setExperiencesFR);
        fetchExperiences("DE", setExperiencesDE);
    }, []);

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6 px-4 md:px-14">
                <h1 className="text-center font-extrabold text-2xl text-foreground w-full md:w-auto">
                    MANAGE EXPERIENCES
                </h1>
                <div className="flex flex-col w-full md:w-auto md:flex-row items-center gap-4">
                    <div className="font-bold text-center w-full md:w-auto">
                        {`${experiencesEN.length + experiencesFR.length + experiencesDE.length} Experiences`}
                    </div>
                    <Button onPress={onOpen} color="secondary" className="rounded-lg font-bold w-full md:w-44">
                        Create Experience
                    </Button>
                </div>
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

            {loading && <p className="mt-6 text-center">Loading...</p>}

            <div className="flex items-center justify-center w-full py-6 pt-12">
                <p className="text-center pl-8">EN</p>
                <Separator className="my-6 w-11/12 mx-auto" />
            </div>
            <DisplayCards experiences={experiencesEN} />
            <div className="flex items-center justify-center w-full py-6">
                <p className="text-center pl-8">FR</p>
                <Separator className="my-6 w-11/12 mx-auto" />
            </div>
            <DisplayCards experiences={experiencesFR} />
            <div className="flex items-center justify-center w-full py-6">
                <p className="text-center pl-8">DE</p>
                <Separator className="my-6 w-11/12 mx-auto" />
            </div>
            <DisplayCards experiences={experiencesDE} />
        </div>
    );
}
