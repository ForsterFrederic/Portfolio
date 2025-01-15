import "../css/constants.css"
import React, {useEffect, useState} from "react";
import PictureMe from "../assets/pictures/picture-me.webp"
import Linkedin from "../assets/pictures/linkedin2.webp";
import Mail from "../assets/pictures/email2.webp";
import Upwork from "../assets/pictures/upwork2.webp";

const CardDesktop = () => {
    return (
        <div className={"h-svh gradient-bg flex-center bg-neutral-800"}>
            <div className={"bg-neutral-900 p-10 flex justify-between w-10/12 shadow-xl rounded-xl"}>
                <div className={"w-5/12 ml-14 my-auto"}>
                    <img src={PictureMe} className={"flex justify-between"}/>
                    <div className={"border-bottom-big mx-auto mt-1.5 rounded"}/>
                </div>
                <div className={"flex-col-center items-end"}>
                    <div className={"flex-col-center items-center sm:mr-14 mr-16 md:mr-12 lg:mr-20 xl:mr-24 2xl:mr-32 py-14"}>
                        <div className={"lg:ml-0"}>
                            <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                            <h1 className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl"}>Frédéric FORSTER</h1>
                        </div>
                        <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 tgrayd2 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>Software & Web Engineer</h2>
                        <p className={"sm:max-w-60 md:max-w-72 lg:max-w-xs xl:max-w-sm mt-14 tgrayd2 text-center text-2sm sm:text-xs md:text-xs lg:text-sm xl:text-base"}>With a background in both front-end and back-end development and a specialization in React and Node.js, I am dedicated to crafting cutting-edge solutions and leveraging my technical skills for long-term growth and success.</p>
                        <p className={"sm:max-w-60 md:max-w-72 lg:max-w-xs xl:max-w-sm mt-14 tgrayd2 text-center text-sm xl:text-base font-bold"}>This website is in developpment,<br/>come back visit it later.</p>
                        <div className={"grid gap-4 grid-flow-col w-max mx-auto lg:mx-0 mt-10 pl-4"}>
                            <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                                <img src={Linkedin} alt="LinkedIn" onClick={() => window.open("https://linkedin.com/in/frédéric-forster")}/>
                            </div>
                            <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                                <img src={Mail} alt="Mail" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                            </div>
                            <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                                <img src={Upwork} alt="Upwork" onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardMobile = () => {
    return (
        <div className={"flex-col-center min-h-svh rounded-b-xl py-14"}>
            <div className={"flex-center items-end w-full"}>
                <div className={"flex-col-center items-center"}>
                    <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white"}>FORSTER Frédéric</h1>
                    <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 tgrayd2 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>Software & Web Engineer</h2>
                    <p className={"max-w-72 text-sm mt-6 tgrayd2 text-center text-2sm"}>With a background in both front-end and back-end development and a specialization in React and Node.js, I am dedicated to crafting cutting-edge solutions and leveraging my technical skills for long-term growth and success.</p>
                    <p className={"sm:max-w-72 md:max-w-72 lg:max-w-xs xl:max-w-sm mt-4 mb-10 tgrayd2 text-center text-base font-bold"}>This website is in developpment,<br/>come back visit it later.</p>
                </div>
            </div>
            <img src={PictureMe} className={"w-8/12 mx-auto"}/>
            <div className={"border-bottom-big w-9/12 mx-auto mt-1.5 rounded"}/>
            <div className={"grid gap-4 grid-flow-col w-max mx-auto lg:mx-0 mt-10"}>
                <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                    <img src={Linkedin} alt="LinkedIn" onClick={() => window.open("https://linkedin.com/in/frédéric-forster")}/>
                </div>
                <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                    <img src={Mail} alt="Mail" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                </div>
                <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                    <img src={Upwork} alt="Upwork" onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1")}/>
                </div>
            </div>
        </div>
    )
}

export default function Development() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    return (
        windowWidth > 768 ? <CardDesktop/> : <CardMobile/>
    );
};