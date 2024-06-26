import "../../css/constants.css"
import {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import Contact from "./Contact";

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [title, setTitle] = useState("FORSTER Frédéric")
    const [subtitle, setSubtitle] = useState("Software & Web Engineer")
    const [description, setDescription] = useState("As technology evolves, I remain committed to continuous learning and staying updated with the latest industry trends. This dedication empowers me to leverage cutting-edge tools and techniques, ensuring that my solutions are not only current but also future-proof.")

    const CardDesktop = () => {
        return (
            <div className={"mt-1"}>
                <div className={"bg-[url('assets/pictures/picture-me.png')] bg-left-top bg-cover flex justify-between mx-5 aspect-[16/6] rounded-xl shadow-black drop-shadow-2xl"}>
                    <div className={"flex-col-center items-end w-full"}>
                        <div className={"flex-col-center items-center @xl:mr-10 2xl:mr-12"}>
                            <div>
                                <div className={"bg-blue-600 w-4/12 h-1.5 rounded mb-3"}/>
                                <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>{title}</h1>
                            </div>
                            <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>{subtitle}</h2>
                            <p className={"w-7/12 text-center mt-7 text-neutral-500 "}>As technology, I remain committed to continuous learning and staying updated with the latest industry trends.</p>
                            <div className={"flex-center gap-x-14 mt-16"}>
                                <div className={"flex-center"}>
                                    <p className={"text-5xl font-medium text-gray-800"}>5</p>
                                    <p className={"font-semibold text-blue-600 text-3xl ml-1"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"text-gray-800 font-medium"}>Years of</p>
                                        <p className={"text-gray-800 font-medium"}>experience</p>
                                    </div>
                                </div>
                                <div className={"flex-center"}>
                                    <p className={"text-5xl font-medium text-gray-800"}>10</p>
                                    <p className={"font-semibold text-blue-600 text-3xl ml-1"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"text-gray-800 font-medium"}>Successful</p>
                                        <p className={"text-gray-800 font-medium"}>projects</p>
                                    </div>
                                </div>
                            </div>
                            <button className={"btn mt-10 px-20"}>Check out my work</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const CardMobile = () => {
        return (
            <div className={"flex-col-center h-svh rounded-b-xl bg-gray-700"}>
                <div className={"flex-center items-end w-full"}>
                    <div className={"flex-col-center items-center"}>
                        <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>{title}</h1>
                        <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>{subtitle}</h2>
                        <p className={"max-w-72 text-sm mt-6 mb-10 text-neutral-500 text-center text-2sm sm:text-xs md:text-xs lg:text-sm xl:text-base"}>{description}</p>
                    </div>
                </div>
                <div className={"bg-[url('assets/pictures/picture-me.png')] bg-left-top flex justify-between w-9/12 rounded-b-xl aspect-[1/1] mx-auto"} style={{backgroundPosition: "2% 4%", backgroundSize: "270%"}}>

                </div>
            </div>
        )
    }

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    return (
        <div>
            <Navbar/>
            {windowWidth > 768 ? <CardDesktop/> : <CardMobile/>}
            <Contact/>
        </div>
    );
};