import "./../css/constants.css"
import React, {useEffect, useState} from "react";
import PictureMe from "../assets/pictures/picture-me.png"
import Linkedin from "../assets/pictures/linkedin.png";
import Mail from "../assets/pictures/email.png";
import WhatsApp from "../assets/pictures/whatsapp.png";
import {Link} from 'react-scroll';
import CV from "../assets/documents/CV Frédéric Forster - English.pdf"
import axios from "axios";

export default function Presentation({ backendApiUrl, language }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [name, setName] = useState("FORSTER Frédéric")
    const [title, setTitle] = useState("Software & Web Engineer")
    const [freelance, setFreelance] = useState("Also available as Freelance.")
    const [description, setDescription] = useState("With a background in both front-end and back-end development and a specialization in React and Node.js, I am dedicated to crafting cutting-edge solutions and leveraging my technical skills for long-term growth and success.")
    const [numberYearsExperience, setNumberYearsExperience] = useState("7")
    const [textYearsExperience, setTextYearsExperience] = useState("7")
    const [numberSuccessfulProjects, setNumberSuccessfulProjects] = useState("11")
    const [textSuccessfulProjects, setTextSuccessfulProjects] = useState("11")
    const [downloadCV, setDownloadCV] = useState("Download my CV")
    const [goToCompetencies, setGoToCompetencies] = useState("My competencies")

    const WhatsAppOrCall = () => {
        const whatsappUrl = `https://wa.me/+33669012285`;

        window.open(whatsappUrl, '_blank');
    };

    const getPresentation = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/presentation/` + language);
            setName(response.data.name);
            setTitle(response.data.title);
            setFreelance(response.data.freelance);
            setDescription(response.data.description);
            setNumberYearsExperience(response.data.numberYearsExperience);
            setTextYearsExperience(response.data.textYearsExperience);
            setNumberSuccessfulProjects(response.data.numberSuccessfulProjects);
            setTextSuccessfulProjects(response.data.textSuccessfulProjects);
            setDownloadCV(response.data.downloadCV);
            setGoToCompetencies(response.data.goToCompetencies);
        } catch (error) {
            console.error('Error fetching presentation:', error);
        }
    };

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    useEffect(() => {
        getPresentation()
    }, [language]);

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
                            <img src={WhatsApp} alt="WhatsApp" onClick={() => WhatsAppOrCall()}/>
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
                                <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl tblack3"}>{name}</h1>
                            </div>
                            <h2 className={"lg:ml-0 font-light mt-0.5 md:mt-1 lg:mt-2 tgrayd3 text-2sm md:text-lg lg:text-xl xl:text-2xl text-center"}>{title}</h2>
                            <p className={"lg:ml-0 font-light mt-12 text-2sm md:text-md lg:text-lg xl:text-xl tblue text-center"}>{freelance}</p>
                            <p className={"max-w-[475px] text-center mt-6 font-light"}>{description}</p>
                            <div className={"lg:ml-0 flex-center mt-24"}>
                                <div className={"flex-center w-52"}>
                                    <p className={"font-medium tblack2 text-3xl md:text-4xl lg:text-5xl xl:text-5xl"}>{numberYearsExperience}</p>
                                    <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                    <div className={"ml-3 max-w-28"}>
                                        <p className={"tblack1 font-medium"}>{textYearsExperience}</p>
                                    </div>
                                </div>
                                <div className={"flex-center w-52"}>
                                    <p className={"font-medium tblack2 text-3xl md:text-4xl lg:text-5xl xl:text-5xl"}>{numberSuccessfulProjects}</p>
                                    <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                    <div className={"ml-3 max-w-28"}>
                                        <p className={"tblack1 font-medium"}>{textSuccessfulProjects}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex gap-4 mt-8 items-center ml-4"}>
                                <button className={"lg:ml-0 btn w-48"} onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = CV;
                                    link.download = 'CV Frédéric Forster - English.pdf';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}>{downloadCV}
                                </button>
                                <Link
                                    className={classNames('lg:ml-0 border tprimary rounded leading-none px-6 py-3 cursor-pointer mx-2 hover:bprimary hover:twhite1 transition uppercase text-xs font-bold w-48 text-center')}
                                    to={"competencies"} smooth={true} duration={500} offset={-68}>
                                    {goToCompetencies}
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
                            <h1 className={"text-4xl md:text-5xl tblack3"}>{name}</h1>
                        </div>
                        <h2 className={"font-light mt-0.5 md:mt-1 tgrayd3 text-lg md:text-2xl"}>{title}</h2>
                        <p className={"lg:ml-0 font-light mt-5 text-2sm md:text-lg lg:text-xl xl:text-2xl tblue"}>{freelance}</p>
                        <p className={"max-w-72 md:max-w-lg text-sm mt-6 mb-10 tgrayd3 text-center text-2sm md:text-lg"}>{description}</p>
                        <div className={"flex-center mt-2"}>
                            <div className={"flex-center"}>
                                <p className={"font-medium tblack2 text-3xl md:text-4xl"}>{numberYearsExperience}</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3 max-w-28"}>
                                    <p className={"tblack1 font-medium"}>{textYearsExperience}</p>
                                </div>
                            </div>
                            <div className={"flex-center"}>
                                <p className={"font-medium tblack2 text-3xl md:text-4xl"}>{numberSuccessfulProjects}</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3 max-w-28"}>
                                    <p className={"tblack1 font-medium"}>{textSuccessfulProjects}</p>
                                </div>
                            </div>
                        </div>
                        <div className={"flex gap-3 mt-12"}>
                            <button className={"lg:ml-0 btn w-40"} onClick={() => {
                                const link = document.createElement('a');
                                link.href = CV;
                                link.download = 'CV Frédéric Forster - English.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}>{downloadCV}
                            </button>
                            <Link
                                className={classNames('lg:ml-0 border tprimary rounded leading-none py-3 cursor-pointer hover:bprimary hover:twhite1 transition uppercase text-xs font-bold text-center w-40')}
                                to={"competencies"} smooth={true} duration={500} offset={-68}>
                                {goToCompetencies}
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
                        <img src={WhatsApp} alt="WhatsApp" onClick={() => WhatsAppOrCall()}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        windowWidth > 1023 ? <CardDesktop/> : <CardMobile/>
    )
}