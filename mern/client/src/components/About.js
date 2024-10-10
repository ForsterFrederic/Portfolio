import React, {useEffect, useState} from 'react';
import './../css/constants.css';
import Picture from "../assets/pictures/full-stack.png"
import axios from "axios";

export default function About({ backendApiUrl, language }) {
    const [title, setTitle] = useState("About me")
    const [text1, setText1] = useState("I am a Full Stack Developer, graduating from my master degree at Epitech in France with a focus on React and Node.js.")
    const [text2, setText2] = useState("I design innovative web solutions by integrating comprehensive expertise, from front-end to back-end, along with proficiency in low-level languages.")
    const [text3, setText3] = useState("I am seeking a full-time role where I can contribute my skills and collaborate effectively for long-term growth.")

    const getAbout = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/about/` + language);
            setTitle(response.data.title);
            setText1(response.data.text1);
            setText2(response.data.text2);
            setText3(response.data.text3);
        } catch (error) {
            console.error('Error fetching about:', error);
        }
    };

    useEffect(() => {
        getAbout()
    }, [language]);

    return (
        <div name="about" className={"flex flex-col gradient-bg-left py-24"}>
            <div className={"mx-auto w-max mb-10 xl:mb-12 2xl:mb-24"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"} />
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>{title}</p>
            </div>
            <div className={"flex flex-col lg:flex-row items-center lg:items-start mx-10 md:mx-14 lg:mx-16 xl:mx-32 2xl:mx-36 lg:mt-14 2xl:mt-0"}>
                <div className={"flex flex-col justify-center lg:mr-36 xl:mr-44 2xl:mr-52"}>
                    <p className={"md:text-lg lg:text-lg xl:text-xl tgrayd3 max-w-3xl mx-auto lg:mx-0 lg:max-w-full text-center lg:text-justify"}>{text1}</p>
                    <p className={"md:text-lg lg:text-lg xl:text-xl tgrayd3 max-w-3xl mx-auto lg:mx-0 lg:max-w-full mt-8 text-center lg:text-justify"}>{text2}</p>
                    <p className={"md:text-lg lg:text-lg xl:text-xl tgrayd3 max-w-3xl mx-auto lg:mx-0 lg:max-w-full mt-8 text-center lg:text-justify"}>{text3}</p>
                </div>
                <img
                    className={"w-full sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-5/12 2xl:w-2/6 rounded-3xl 2xl:mr-32 lg:self-center my-auto pt-14 lg:pt-0"}
                    src={Picture}
                />
            </div>
        </div>
    );
}