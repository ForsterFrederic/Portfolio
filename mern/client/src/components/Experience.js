import * as React from 'react';
import { useEffect, useState } from "react";
import {useWindowDimensions} from "../contexts/WindowDimensionsContext";
import axios from "axios";

export default function Experience({ backendApiUrl, language }) {
    const windowDimensions = useWindowDimensions()
    const [items, setItems] = useState([]);

    const getExperience = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/experience/${language}`);
            const newItems = response.data
                .map((item) => ({
                    company: item.company,
                    title: item.title,
                    duration: item.duration,
                    description: item.description,
                    technologies: item.technologies,
                    url: item.url,
                    position: item.position,
                }))
                .sort((a, b) => a.position - b.position);
            setItems(newItems);
        } catch (error) {
            setItems([]);
            console.error('Error fetching experiences:', error);
        }
    };

    useEffect(() => {
        getExperience();
    }, [language]);

    const getTitleLanguage = () => {
        switch (language) {
            case "FR":
                return "Mes Expériences";
            case "DE":
                return "Meine Erfahrungen";
            default:
                return "My Experiences";
        }
    };

    return (
        items.length !== 0 && <div name="experience" className="py-24">
            <div className={"flex flex-col"}>
                <div className={"mx-auto w-max mb-12 xl:mb-16 2xl:mb-28"} style={windowDimensions.wWCheck(700) ? {top: `${1 * 130}px`, position: "sticky", zIndex: "1000", padding: "10px"} : { top: `${1 * 130}px`}}>
                    <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"} />
                    <p className={"text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white"}>{getTitleLanguage()}</p>
                </div>
                {items.map((item, index) => (
                    <div key={index} className={`min-h-96 w-full flex flex-col lg:flex-row justify-center items-center md:stickyCards bg-neutral-800 shadow-2xl`} style={windowDimensions.wWCheck(700) ? {marginTop: index === 0 ? "" : "150px", top: `${1 * 260}px`, position: "sticky", zIndex: "1000", padding: "10px"} : {marginTop: index === 0 ? "" : "50px"}}>
                        <div className={"flex lg:flex-col justify-center items-center w-48 xl:ml-10"}>
                            <div className={"w-2 h-24 bblue rounded"}/>
                            <p className={"mt-4 lg:mt-2 text-7xl lg:text-9xl mx-16 lg:mb-4 text-stroke"}>{index < 9 ? ("0" + (index+1)) : index+1}</p>
                            <div className={"w-2 h-24 bblue rounded"}/>
                        </div>
                        <div className={"flex flex-col mx-20 py-10 w-full"}>
                            <div className={"justify-center xl:justify-normal items-center xl:items-start px-6 xl:px-0 flex-col xl:flex-row flex gap-3"}>
                                <div>
                                    <p className={"text-2xl text-center xl:text-left lg:text-4xl uppercase"}>{item.title}</p>
                                    <p className={"text-xl text-center xl:text-left lg:text-3xl tgrayd2 mt-1"}>{item.company}</p>
                                </div>
                                <p className={"text-lg lg:text-2xl mt-2 tprimary xl:ml-auto uppercase"}>{item.duration}</p>
                            </div>
                            <p className={"mt-8 px-6 xl:px-0 text-justify lg:text-lg"}>{item.description}</p>
                            <div className={"justify-center xl:justify-normal items-center xl:items-start px-6 xl:px-0 flex-col xl:flex-row flex mt-10"}>
                                {item.url && <p className={"tgrayd2"}>{language === "EN" ? "Take a look to the result:" : language === "FR" ? "Jettez un coup d'oeil au résultat:" : "Schauen Sie sich das Ergebnis an:"} <a className={"underline underline-offset-4 tprimary cursor-pointer text-sm lg:text-base"} href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></p>}
                                <p className={"xl:ml-auto mt-4 xl:mt-0 tgrayd2 text-sm lg:text-base text-center xl:text-right"}>{item.technologies}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}