import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import {Backdrop, Box, Fade} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function IframeComponent({ link }) {
    return (
        <div className="relative w-full overflow-hidden bwhite3 rounded p-1 border">
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10 text-xl font-bold">
                <p>Loading the website...</p>
            </div>
            <iframe
                src={link}
                className="responsive-iframe"
                style={{
                    display: 'block',
                    position: 'relative',
                    zIndex: 20,
                }}
            ></iframe>
        </div>
    );
}

export default function Projects({ backendApiUrl, language }) {
    const [expand, setExpand] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(0);
    const [items, setItems] = useState([]);
    const [itemSelected, setItemSelected] = useState({});
    const [open, setOpen] = React.useState(false);

    const modalStyle = {
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        outline: "none",
        borderRadius: "5px",
        boxShadow: 24,
        p: 6,
        overflowY: 'auto',

        width: '80%',
        maxHeight: '80%',

        '@media (max-width: 600px)': {
            width: '95%',
            top: '50%',
            maxHeight: '85%',
        },
        '@media (min-width: 600px) and (max-width: 900px)': {
            width: '95%',
            top: '50%',
            maxHeight: '85%',
        },
        '@media (min-width: 900px)': {
            width: '90%',
            top: '50%',
            maxHeight: '85%',
        }
    };

    const handleOpen = (item) => {
        setOpen(true);
        setItemSelected(item);
    }

    const handleClose = () => setOpen(false);

    const getProject = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/project/${language}`);
            const newItems = response.data.map((item) => ({
                title: item.title,
                description: item.description,
                duration: item.duration,
                technologies: item.technologies,
                link: item.link,
                picture: item.picture ? `${backendApiUrl.replace('/api', '')}/${item.picture}` : ""
            }));
            setItems(newItems);
        } catch (error) {
            setItems([]);
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        getProject();
    }, [language]);

    function getItemsToShow() {
        if (window.innerWidth >= 1280) {
            return expand ? items.length : 6; // xl
        } else if (window.innerWidth >= 1024) {
            return expand ? items.length : 4; // lg
        } else if (window.innerWidth >= 768) {
            return expand ? items.length : 4; // md
        } else {
            return expand ? items.length : 3; // sm
        }
    }

    const getTitleLanguage = () => {
        switch (language) {
            case "FR":
                return "Projets publics";
            case "DE":
                return "Öffentliche Projekte";
            default:
                return "Public projects";
        }
    }

    const updateItemsToShow = () => {
        const count = getItemsToShow();
        setItemsToShow(count);
    };

    useEffect(() => {
        updateItemsToShow();
        window.addEventListener("resize", updateItemsToShow);
        return () => window.removeEventListener("resize", updateItemsToShow);
    }, [expand]);

    return (
        items.length > 0 && (
            <div name={"projects"} className={"gradient-bg-right py-24"}>
                <div className={"mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 mx-auto w-max"}>
                    <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"} />
                    <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>{getTitleLanguage()}</p>
                </div>
                <div>
                    <div className="grid gap-6 xl:gap-8 2xl:gap-12 mx-6 sm:mx-14 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                        {items.slice(0, itemsToShow).map((item, index) => (
                            <div key={index} className="cursor-pointer hover:scale-105 rounded-lg shadow-md hover:shadow-xl transition bwhite1 flex flex-col border-1 border-primary hover:border-secondary w-full"
                                onClick={() => handleOpen(item)}
                            >
                                <p className="font-medium text-xl lg:text-3xl mt-6 text-center">{item.title}</p>
                                <div className="bblue mx-auto w-2/12 h-1 mt-1 relative rounded mb-1" />
                                {item.picture && <div className="relative w-full overflow-hidden">
                                    <div className="relative w-full overflow-hidden corner-cross-frame">
                                        <div className="aspect-[16/6] md:aspect-[16/8] bwhite3 rounded lg:aspect-[16/8] xl:aspect-[16/6] w-full">
                                            <img className="p-6 w-full h-full object-cover object-top rounded-t"
                                                 src={item.picture}
                                                 alt={item.title}
                                            />
                                        </div>
                                    </div>
                                </div>}
                                <div className="flex flex-col w-full px-6 pb-6 flex-grow">
                                    <p className="tgrayd3 text-sm lg:text-base font-light text-justify line-clamp-3">
                                        {item.description}
                                    </p>
                                    <p className="mt-auto tgrayd3 text-xs lg:text-sm pt-3 font-light">
                                        {item.duration + (item.technologies ? " - " + item.technologies : "") + (item.link ? " - " + item.link : "")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {itemsToShow < items.length || expand ? (
                    <div onClick={() => setExpand(!expand)}>
                        <p className={"btn mt-10 w-28 mx-auto text-center text-sm cursor-pointer"}>
                            {expand ? "Collapse" : "Expand"}
                        </p>
                    </div>
                ) : null}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                    style={{zIndex: 2050}}
                >
                    <Fade in={open}>
                        <Box sx={modalStyle}>
                            <button
                                className="absolute top-10 right-12 text-gray-600 hover:text-gray-900 focus:outline-none"
                                onClick={handleClose}
                            >
                                <CloseIcon style={{ fontSize: '2rem' }} className={"tblue"} />
                            </button>
                            <p className="font-bold text-xl lg:text-3xl text-center">{itemSelected.title}</p>
                            <div className="bblue mx-auto w-2/12 h-1 mt-1 relative rounded mb-6" />
                            {itemSelected.link && <div className="relative w-full overflow-hidden">
                                <IframeComponent link={itemSelected.link}/>
                            </div>}
                            <div className="flex flex-col w-full flex-grow mt-6">
                                <p className="text-sm lg:text-base text-justify">{itemSelected.description}</p>
                                <p className="mt-auto text-xs lg:text-sm pt-3 font-light">
                                    {itemSelected.duration + (itemSelected.technologies ? " - " + itemSelected.technologies : "") + (itemSelected.link ? " - " + itemSelected.link : "")}
                                </p>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        )
    );
}
