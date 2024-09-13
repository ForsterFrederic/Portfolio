import "./../css/constants.css"
import React, {useEffect, useState} from "react";
import PictureMe from "../assets/pictures/picture-me.png"
import Linkedin from "../assets/pictures/linkedin.png";
import Mail from "../assets/pictures/email.png";
import Upwork from "../assets/pictures/upwork.png";
import {Link} from 'react-scroll';
import CV from "../assets/documents/CV Frédéric Forster - English.pdf"

export default function Presentation() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [title, setTitle] = useState("FORSTER Frédéric")
    const [subtitle, setSubtitle] = useState("Software & Web Engineer")
    const [description, setDescription] = useState("With a background in both front-end and back-end development and a specialization in React and Node.js, I am dedicated to crafting cutting-edge solutions and leveraging my technical skills for long-term growth and success.")
    const [freelance, setFreelance] = useState("Also available in Freelance.")

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const CardDesktop = () => {
        return (
            <div name={"presentation"} className={"gradient-bg-left-darker shadow-black drop-shadow-lg"}>
                <div className={"flex justify-between min-h-lvh pt-16"}>
                    <div className={"absolute grid gap-6 grid-flow-row left-20 top-36"}>
                        <div className="w-11 h-11 cursor-pointer hover:scale-105">
                            <img src={Linkedin} alt="LinkedIn" onClick={() => window.open("https://linkedin.com/in/frédéric-forster")}/>
                        </div>
                        <div className="w-11 h-11 cursor-pointer hover:scale-105">
                            <img src={Mail} alt="Mail" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                        </div>
                        <div className="w-11 h-11 cursor-pointer hover:scale-105">
                            <img src={Upwork} alt="Upwork" onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1?mp_source=sharehttps://www.upwork.com/freelancers/~012846dea0085750d1?mp_source=share")}/>
                        </div>
                    </div>
                    <div className={"w-5/12 ml-32 my-auto 2xl:my-0 2xl:mt-auto 2xl:mb-2"}>
                        <img src={PictureMe} className={"flex justify-between"}/>
                        <div className={"border-bottom-big mx-auto mt-1.5 rounded"}/>
                    </div>
                    <div className={"flex-center px-12 mx-auto"}>
                        <div className={"flex-col-center items-center py-8"}>
                            <div className={"lg:ml-0"}>
                                <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                                <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl tblack3"}>{title}</h1>
                            </div>
                            <h2 className={"lg:ml-0 font-light mt-0.5 md:mt-1 lg:mt-2 tgrayd3 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>{subtitle}</h2>
                            <p className={"lg:ml-0 font-light mt-12 text-2sm md:text-lg lg:text-xl xl:text-2xl"}>{freelance}</p>
                            <p className={"max-w-[450px] text-center mt-6 font-light"}>{description}</p>
                            <div className={"lg:ml-0 flex-center mt-24"}>
                                <div className={"flex-center w-52"}>
                                    <p className={"font-medium tblack2 text-3xl md:text-4xl lg:text-5xl xl:text-5xl"}>7</p>
                                    <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"tblack1 font-medium"}>Years of</p>
                                        <p className={"tblack1 font-medium"}>experience</p>
                                    </div>
                                </div>
                                <div className={"flex-center w-52"}>
                                    <p className={"font-medium tblack2 text-3xl md:text-4xl lg:text-5xl xl:text-5xl"}>11</p>
                                    <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"tblack2 font-medium"}>Successful</p>
                                        <p className={"tblack2 font-medium"}>projects</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex gap-4 mt-8 items-center ml-4"}>
                                <button className={"lg:ml-0 btn w-44"} onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = CV;
                                    link.download = 'CV Frédéric Forster - English.pdf';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}>Download my CV
                                </button>
                                <Link
                                    className={classNames('lg:ml-0 border tprimary rounded leading-none px-6 py-3 cursor-pointer mx-2 hover:bprimary hover:twhite1 transition uppercase text-xs font-bold')}
                                    to={"competencies"} smooth={true} duration={500} offset={-68}>
                                    My competencies
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const CardMobile = () => {
        return (
            <div name={"presentation"} className={"flex-col-center rounded-b-xl pt-32 pb-4 gradient-bg-right mb-p0"}>
                <div className={"flex-center items-end w-full"}>
                    <div className={"flex-col-center items-center"}>
                        <div>
                            <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                            <h1 className={"text-4xl md:text-5xl tblack3"}>{title}</h1>
                        </div>
                        <h2 className={"font-light mt-0.5 md:mt-1 tgrayd3 text-lg md:text-2xl"}>{subtitle}</h2>
                        <p className={"max-w-72 md:max-w-lg text-sm mt-6 mb-10 tgrayd3 text-center text-2sm md:text-lg"}>{description}</p>
                        <div className={"flex-center gap-x-8 mt-2"}>
                            <div className={"flex-center"}>
                                <p className={"font-medium tblack2 text-3xl md:text-4xl"}>7</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3"}>
                                    <p className={"tblack1 font-medium"}>Years of</p>
                                    <p className={"tblack1 font-medium"}>experience</p>
                                </div>
                            </div>
                            <div className={"flex-center"}>
                                <p className={"font-medium tblack2 text-3xl md:text-4xl"}>11</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3"}>
                                    <p className={"tblack2 font-medium"}>Successful</p>
                                    <p className={"tblack2 font-medium"}>projects</p>
                                </div>
                            </div>
                        </div>
                        <div className={"flex gap-3 mt-12"}>
                            <button className={"lg:ml-0 btn w-44"} onClick={() => {
                                const link = document.createElement('a');
                                link.href = CV;
                                link.download = 'CV Frédéric Forster - English.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}>Download my CV
                            </button>
                            <Link
                                className={classNames('lg:ml-0 border tprimary rounded leading-none px-6 py-3 cursor-pointer hover:bprimary hover:twhite1 transition uppercase text-xs font-bold')}
                                to={"competencies"} smooth={true} duration={500} offset={-68}>
                                My competencies
                            </Link>
                        </div>
                    </div>
                </div>
                <img src={PictureMe} className={"w-8/12 md:w-6/12 mx-auto mt-8"}/>
                <div className={"border-bottom-big w-9/12 md:w-6/12 mx-auto mt-1.5 rounded"}/>
                <div className={"grid gap-4 grid-flow-col w-max mx-auto lg:mx-0 mt-10"}>
                    <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                        <img src={Linkedin} alt="LinkedIn" onClick={() => window.open("https://linkedin.com/in/frédéric-forster")}/>
                    </div>
                    <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                        <img src={Mail} alt="Mail" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                    </div>
                    <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                        <img src={Upwork} alt="Upwork" onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1?mp_source=sharehttps://www.upwork.com/freelancers/~012846dea0085750d1?mp_source=share")}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        windowWidth > 1024 ? <CardDesktop/> : <CardMobile/>
    )
}