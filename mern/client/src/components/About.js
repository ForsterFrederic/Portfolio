import React, { useEffect, useRef, useState } from 'react';
import './../css/constants.css';
import Picture from "../assets/pictures/full-stack.webp";
import axios from "axios";
import AnimatedParagraph from "./AnimatedParagraph";
import { motion, useScroll, useTransform } from "framer-motion";
import {useWindowDimensions} from "../contexts/WindowDimensionsContext";

export default function About({ backendApiUrl, language }) {
    const [title, setTitle] = useState("About me");
    const [text1, setText1] = useState("I am a Full Stack Developer with a master’s degree from Epitech in France, specializing in React and Node.js. I build dynamic, responsive applications using modern technologies like React, Node.js, and Express, alongside databases such as MongoDB and PostgreSQL to deliver scalable solutions tailored to diverse needs.");
    const [text2, setText2] = useState("In addition to full-stack development, I have a strong foundation in low-level programming (C, C++), which allows me to address complex architectural challenges and optimize performance. This combination of skills enables me to create solutions that are both user-friendly and highly efficient.");
    const [text3, setText3] = useState("I am looking for a full-time role where I can contribute my technical expertise to innovative projects, collaborate with a passionate team, and continue growing through the adoption of new technologies and practices.");

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
        getAbout();
    }, [language]);

    const container = useRef(null);
    const windowDimensions = useWindowDimensions()
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 25%", "start end"],
    });

    const paddingX = useTransform(scrollYProgress, [0, 1], [windowDimensions.wWCheck(700) ? "68px" : "22px", "0px"]);

    return (
        <motion.div
            ref={container}
            name="about"
            className="flex flex-col py-6 md:py-12 xl:py-16 bg-neutral-800 rounded-3xl shadow-2xl"
            style={{
                marginLeft: paddingX,
                marginRight: paddingX,
            }}
        >
            <div className={"max-w-[1880px] mx-auto"}>
                <div className="mx-auto w-max mt-10 mb-20 xl:mb-20 2xl:mb-28">
                    <div className="bprimary mx-auto w-28 h-1.5 rounded mb-3" />
                    <p className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white">{title}</p>
                </div>
                <div className="flex flex-col xl:flex-row items-center xl:items-start xl:mx-16 2xl:mx-36 lg:mt-14 xl:mt-28 2xl:mt-0">
                    <div className="flex flex-col justify-center xl:mr-6 2xl:mr-52 w-10/12 my-auto transform -translate-y-10">
                        <AnimatedParagraph value={[text1, <br />, <br />, text2, <br />, <br />, text3]} />
                    </div>
                    <div className="bg-svg2 my-auto max-w-2xl xl:max-w-full">
                        <img
                            className="rounded-3xl 2xl:mr-32 scale-90 lg:self-center my-auto pt-14 lg:pt-0"
                            src={Picture}
                            alt="Developer"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}