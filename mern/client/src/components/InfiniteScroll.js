import React, {useEffect, useRef, useState} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";

const InfiniteScrollWithScrollY = ({ backendApiUrl, language }) => {
    const elementRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: ["start 0", "start 1"],
    });
    const translateX = useTransform(scrollYProgress, [0, 1], [100, 300]);
    const [programmingLanguages, setProgrammingLanguages] = useState("Programming Languages")
    const [front, setFront] = useState("Frontend Development")
    const [back, setBack] = useState("Backend Development")
    const [database, setDatabase] = useState("Database Technologies")
    const [testing, setTesting] = useState("Testing & Quality Assurance")
    const [devops, setDevops] = useState("DevOps & Containerization")
    const [tools, setTools] = useState("Development Tools")
    const items = [database, testing, tools, programmingLanguages, front, back, devops];

    const getCompetencies = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/competencies/` + language);
            setProgrammingLanguages(response.data.languages);
            setFront(response.data.front);
            setBack(response.data.back);
            setDatabase(response.data.database);
            setTesting(response.data.test);
            setDevops(response.data.devops);
            setTools(response.data.tools);
        } catch (error) {
            console.error('Error fetching competencies:', error);
        }
    };

    useEffect(() => {
        getCompetencies()
    }, [language]);

    return (
        <div
            ref={elementRef}
            className={"shadow-2xl"}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    display: "flex",
                    maxWidth: "100vw",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <motion.div
                    style={{
                        display: "flex",
                        whiteSpace: "nowrap",
                        x: translateX,
                    }}
                    className={"bg-neutral-800 h-20"}
                >
                    {[...items, ...items].map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                                borderRadius: "8px",
                            }}
                            className={"uppercase text-xs sm:text-xs mx-3 sm:mx-5 md:mx-8 md:text-base tgrayd2"}
                        >
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteScrollWithScrollY;