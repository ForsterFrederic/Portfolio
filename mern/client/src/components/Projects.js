import React, { useState, useEffect } from "react";
import axios from "axios";
import ZoomParallax from "./ZoomParallax";
import Ipad from "../assets/pictures/ipad.webp";

export default function Projects({ backendApiUrl, language }) {
    const [items, setItems] = useState([]);
    const [imageStatus, setImageStatus] = useState({});
    const [displayMore, setDisplayMore] = useState(false);

    const getProject = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/project/${language}`);
            const newItems = response.data
                .map((item) => ({
                    title: item.title,
                    description: item.description,
                    duration: item.duration,
                    technologies: item.technologies,
                    link: item.link,
                    picture: item.picture ? `${backendApiUrl.replace('/api', '')}/${item.picture.replace('/root/apps/portfolio/dest/mern/server/', '')}` : "",
                    position: item.position,
                }))
                .sort((a, b) => a.position - b.position);
            setItems(newItems);
            newItems.forEach((item) => {
                if (item.picture) {
                    checkImageAvailability(item.picture);
                }
            });
        } catch (error) {
            setItems([]);
            console.error('Error fetching projects:', error);
        }
    };

    const checkImageAvailability = (url) => {
        const img = new Image();
        img.onload = () => setImageStatus((prev) => ({ ...prev, [url]: true }));
        img.onerror = () => setImageStatus((prev) => ({ ...prev, [url]: false }));
        img.src = url;
    };

    useEffect(() => {
        getProject();
    }, [language]);

    const getTitleLanguage = () => {
        switch (language) {
            case "FR":
                return "Projets";
            case "DE":
                return "Projekte";
            default:
                return "Projects";
        }
    }

    return (
        items.length !== 0 && <div name={"projects"} className="py-24">
            <div className={"mx-auto w-max mb-12 xl:mb-16 2xl:mb-28"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"} />
                <p className={"text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white"}>{getTitleLanguage()}</p>
            </div>
            <ZoomParallax />
            <div className="relative flex flex-col justify-center">
                <h1 className="text-center tprimary px-6 text-3xl md:text-4xl xl:text-5xl font-bold -mt-8 md:-mt-20 lg:-mt-52 xl:-mt-28 3xl:-mt-52 mb-10">{items[0]?.title}</h1>
                <p className="text-white px-6 mb-8 text-justify font-medium max-w-[1745px] mx-auto">{items[0].description}</p>
                <p className="text-center tgrayd2 text-sm font-medium mb-20">{items[0]?.duration + (items[0]?.duration ? " - " : " ")}{items[0]?.technologies}{(items[0]?.link ? " - " : " ") + items[0]?.link}</p>
            </div>
            {items.slice(1, displayMore === false ? 6 : items.length).map((item, index) => {
                const imageSrc = imageStatus[item.picture] !== undefined ? (imageStatus[item.picture] ? item.picture : "/screenshots/project"+(index+2)+"/large-desktop-landscape.webp") : "/screenshots/project"+(index+2)+"/large-desktop-landscape.webp";

                return (
                    <div key={index} className={`${index % 2 === 0 ? "bg-neutral-800 rounded-3xl mx-6 sm:mx-14 xl:mx-[68px]" : "bg-neutral-900 mx-6 sm:mx-14 xl:mx-[68px] rounded-3xl"} md:sticky md:top-24 text-white flex flex-col items-center justify-center py-16 mb-20 ${index !== 0 && "mt-10 md:mt-72"}`}>
                        <div className="w-10/12 xl:w-5/12">
                            <picture>
                                <div className="iPadMockup shadow-2xl">
                                    <img
                                        src={Ipad}
                                        alt="iPad Mockup"
                                        className="mockupImage"
                                    />
                                    <img
                                        src={imageSrc}
                                        className="mockupContent aspect-[4/3]"
                                        alt={`Project ${item.title}`}
                                    />
                                </div>
                            </picture>
                        </div>
                        <h1 className="text-center tprimary px-6 text-3xl md:text-4xl xl:text-5xl font-bold mt-8 mb-8">{item.title}</h1>
                        <p className="text-justify px-6 text-white mb-8 font-medium max-w-[1800px] mx-auto whitespace-pre-wrap md:px-10 lg:px-14">{item.description}</p>
                        <p className="text-center tgrayd2 text-sm font-medium">{item.duration + (item.duration ? " - " : " ")}{item.technologies}{(item.link ? " - " : " ") + item.link}</p>
                        {item?.link && <button onClick={() => window.open(item?.link, "_blank")} className={"mt-5 w-72 md:w-96 text-sm border py-3 rounded leading-none px-6 cursor-pointer mx-2 hover:bprimary hover:twhite1 transition uppercase font-medium text-center"}>{language === "EN" ? "Take a look to the result" : language === "FR" ? "Jettez un coup d'oeil au résultat" : "Schauen Sie sich das Ergebnis an"}</button>}
                    </div>
                );
            })}
            {items.length > 6 && <div className={"flex justify-center"}>
                <button onClick={() => setDisplayMore(!displayMore)} className={"btn mx-auto"}>{displayMore === false
                    ? language === "EN"
                    ? "Display more of my projects"
                    : language === "FR"
                    ? "Afficher plus de projets"
                    : "Mehr Projekte anzeigen"
                    : language === "EN"
                    ? "Display less of my projects"
                    : language === "FR"
                    ? "Afficher moins de projets"
                    : "Weniger Projekte anzeigen"}</button>
            </div>}
        </div>
    );
}