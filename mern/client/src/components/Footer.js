import React, {useEffect, useState} from 'react';
import './../css/constants.css';
import { animateScroll as scroll } from 'react-scroll';
import axios from "axios";

export default function Footer({ backendApiUrl, language }) {
    const [rights, setRights] = useState("©2024 Frédéric Forster. All Rights Reserved.")
    const [mern, setMern] = useState("Custom MERN stack website (MongoDB, Express, React, Node).")

    const getFooter = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/footer/` + language);
            setRights(response.data.rights);
            setMern(response.data.mern);
        } catch (error) {
            console.error('Error fetching footer:', error);
        }
    };

    useEffect(() => {
        getFooter()
    }, [language]);

    return (
        <div className={"pt-12 pb-10 gradient-bg-right px-6"}>
            <svg onClick={() => {scroll.scrollToTop()}} fill={"var(--primary)"} viewBox="0 0 256.00 256.00" width="50" className={"mx-auto cursor-pointer hover:scale-105 transition"} id="Flat" xmlns="http://www.w3.org/2000/svg" stroke={"var(--primary)"} strokeWidth="15.104" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="4.096"></g><g id="SVGRepo_iconCarrier"> <path d="M210.82861,205.17188a3.99992,3.99992,0,1,1-5.65722,5.65625L128,133.65723l-77.17139,77.1709a3.99992,3.99992,0,0,1-5.65722-5.65625l80-80a3.99971,3.99971,0,0,1,5.65722,0Zm-160-74.34375L128,53.65723l77.17139,77.1709a3.99992,3.99992,0,0,0,5.65722-5.65625l-80-80a3.99971,3.99971,0,0,0-5.65722,0l-80,80a3.99992,3.99992,0,0,0,5.65722,5.65625Z"></path></g></svg>
            <p className={"md:text-xs lg:text-md xl:text-lg tgrayd2 text-center mt-14 mb-2"}>{rights}</p>
            <p className={"md:text-xs lg:text-sm xl:text-md tgrayd2 text-center"}>{mern}</p>
        </div>
    );
}