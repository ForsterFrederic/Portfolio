import "./../css/constants.css"
import React, {useEffect, useState} from "react";
import PictureMe from "../assets/pictures/picture-me.webp"
import Linkedin from "../assets/pictures/linkedin2.webp";
import Mail from "../assets/pictures/email2.webp";
import WhatsApp from "../assets/pictures/whatsapp2.webp";
import Phone from "../assets/pictures/phone2.webp";
import Upwork from "../assets/pictures/upwork2.webp";
import {scroller, Link} from 'react-scroll';
import CV from "../assets/documents/CV Frédéric Forster - English.pdf"
import CVFR from "../assets/documents/CV Frédéric Forster.pdf"
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import {motion} from "framer-motion"
import Countup from "./Countup";
import {useWindowDimensions} from "../contexts/WindowDimensionsContext";

export default function Presentation({ backendApiUrl, language }) {
    const [name, setName] = useState("Hi, I'm Frédéric Forster,")
    const [title, setTitle] = useState("Full-Stack Developer\n" + "& Software Architect")
    const [freelance, setFreelance] = useState("Available for Full-Time or Freelance Opportunities.")
    const [description, setDescription] = useState("I specialize in front-end and back-end development with expertise in React, Node.js, and low-level programming (C, C++). I design scalable, high-performance software solutions, delivering innovative results that foster growth and success while staying at the forefront of emerging technologies.")
    const [numberYearsExperience, setNumberYearsExperience] = useState("8")
    const [textYearsExperience, setTextYearsExperience] = useState("Years of Experience")
    const [numberSuccessfulProjects, setNumberSuccessfulProjects] = useState("0")
    const [textSuccessfulProjects, setTextSuccessfulProjects] = useState("Successful Projects")
    const [downloadCV, setDownloadCV] = useState("Download my CV")
    const [goToCompetencies, setGoToCompetencies] = useState("ABOUT ME")
    const [openWork, setOpenWork] = useState("Open to work")
    const [based, setBased] = useState("Based in France")
    const [tooltipOpenLinkedin, setTooltipOpenLinkedin] = useState(false);
    const [tooltipOpenMail, setTooltipOpenMail] = useState(false);
    const [tooltipOpenWhatsApp, setTooltipOpenWhatsApp] = useState(false);
    const [tooltipOpenPhone, setTooltipOpenPhone] = useState(false);
    const [tooltipOpenUpwork, setTooltipOpenUpwork] = useState(false);
    const windowDimensions = useWindowDimensions()
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!hasAnimated) {
            setTimeout(() => {
                setHasAnimated(true);
            }, 600)
        }
    }, [hasAnimated]);

    const CallWhatsApp = () => {
        const whatsappUrl = `https://wa.me/+33669012285`;

        window.open(whatsappUrl, '_blank');
    };

    const CallPhone = () => {
        const phoneUrl = `Tel: +33 06 69 01 22 85`;
        window.open(phoneUrl, '_self');
    };

    const getPresentation = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/presentation/` + language);
            setName(response.data.name);
            setTitle(response.data.title);
            setFreelance(response.data.freelance);
            setDescription(response.data.description);
            setTextYearsExperience(response.data.textYearsExperience);
            setTextSuccessfulProjects(response.data.textSuccessfulProjects)
            setDownloadCV(response.data.downloadCV);
            setGoToCompetencies(response.data.goToCompetencies);
            setOpenWork(response.data.openWork);
            setBased(response.data.based);
        } catch (error) {
            console.error('Error fetching presentation:', error);
        }
    };

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`${backendApiUrl}/project/${language}`);
                setNumberSuccessfulProjects(response.data.length.toString())
            } catch (error) {
                console.error('Error fetching number of successful projects in presentation:', error);
            }
        };

        getProject();
        getPresentation()
    }, [language]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearsOfExperience = currentYear - 2018;
        setNumberYearsExperience((yearsOfExperience + 1).toString());
    }, []);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const containerVariants = {
        initial: {
            opacity: 0,
        },
        animate: hasAnimated
            ? {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delay: 0.3,
            }} : {}
    };

    const itemVariants = {
        initial: {
            opacity: 0,
            x: -40,
        },
        animate: hasAnimated
            ? {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                type: "spring",
                stiffness: 50,
                damping: 15,
            },
        } : {}
    };

    const pictureVariants = {
        initial: {
            opacity: 0,
            y: 400,
        },
        animate: hasAnimated
            ? {
                opacity: 1,
                y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 50,
                    damping: 15,
                    duration: 0.8,
                },
            }
            : {}
    };

    const textVariants = {
        initial: {
            opacity: 0,
            x: 100,
        },
        animate: hasAnimated
            ? {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.8,
            }} : {}
    };

    const text2Variants = {
        initial: {
            opacity: 0,
            x: 100,
        },
        animate: hasAnimated
            ? {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.8,
            }} : {}
    };

    const boxVariants = {
        initial: {
            opacity: 0,
            x: 100,
        },
        animate: hasAnimated
            ? {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.6,
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.8,
            }} : {}
    };

    const availableVariants = {
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: hasAnimated
            ? {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.8,
            }} : {}
    };

    const itemsArray = [
        {
            open: tooltipOpenLinkedin,
            onopen: () => setTooltipOpenLinkedin(true),
            onclose: () => setTooltipOpenLinkedin(false),
            title: "LinkedIn: https://linkedin.com/in/frédéric-forster",
            picture: Linkedin,
            onclick: () => window.open("https://linkedin.com/in/frédéric-forster", "_blank"),
            alt: "LinkedIn",
        },
        {
            open: tooltipOpenMail,
            onopen: () => setTooltipOpenMail(true),
            onclose: () => setTooltipOpenMail(false),
            title: "Mail: forster.frederic@gmail.com",
            picture: Mail,
            onclick: () => (window.location.href = "mailto:forster.frederic@gmail.com"),
            alt: "Mail",
        },
        {
            open: tooltipOpenWhatsApp,
            onopen: () => setTooltipOpenWhatsApp(true),
            onclose: () => setTooltipOpenWhatsApp(false),
            title: "WhatsApp: +33 06 69 01 22 85",
            picture: WhatsApp,
            onclick: () => CallWhatsApp(),
            alt: "WhatsApp",
        },
        {
            open: tooltipOpenPhone,
            onopen: () => setTooltipOpenPhone(true),
            onclose: () => setTooltipOpenPhone(false),
            title: "Tel: +33 06 69 01 22 85",
            picture: Phone,
            onclick: () => CallPhone(),
            alt: "Phone",
        },
        {
            open: tooltipOpenUpwork,
            onopen: () => setTooltipOpenUpwork(true),
            onclose: () => setTooltipOpenUpwork(false),
            title: "Upwork: https://www.upwork.com/freelancers/~012846dea0085750d1",
            picture: Upwork,
            onclick: () =>
                window.open(
                    "https://www.upwork.com/freelancers/~012846dea0085750d1",
                    "_blank"
                ),
            alt: "Upwork",
        },
    ];

    const CustomTooltip = ({ title, children }) => {
        return (
            <div className="tooltip">
                {children}
                <div className="tooltip-text">{title}</div>
            </div>
        );
    };

    const CardDesktop = () => {
        return (
            <div name={"presentation"} className={"shadow-black drop-shadow-lg relative z-10"}>
                <div className="min-h-lvh flex items-center">
                    <motion.div
                        className="absolute grid gap-8 top-36 z-2"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        style={{
                            position: 'absolute',
                            left: '5rem',
                            top: '9rem',
                            zIndex: 2,
                        }}
                    >
                        {itemsArray.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                layout
                            >
                                <CustomTooltip title={item.title}>
                                    <div className="w-11 h-11 cursor-pointer">
                                        <img
                                            src={item.picture}
                                            alt={item.alt}
                                            onClick={item.onclick}
                                        />
                                    </div>
                                </CustomTooltip>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div variants={pictureVariants} initial="initial" animate="animate" className="rounded-[30%_70%_70%_30%/30%_30%_70%_70%] w-5/12 xl:ml-20 2xl:ml-40 relative xl:top-24 2xl:top-12 2xl-2:top-5 2xl-3:top-0"
                                style={{
                                    background: 'linear-gradient(145deg, #1e1e1e 0%, #e28413 50%, #1e1e1e 100%)',
                                }}>
                        <motion.div variants={pictureVariants} initial="initial" animate="animate">
                            <img src={PictureMe} className={"flex justify-between scale-[118%] top-6 2xl:top-9 relative z-1"}/>
                        </motion.div>
                        <motion.div
                            variants={availableVariants}
                            initial="initial"
                            animate="animate"
                            className={"flex absolute"}
                            style={{ position: "absolute"}}
                        >
                            <p className={"text-7xl mr-3 tprimary"}>*</p>
                            <div className={"relative top-2"}>
                                <p className={"text-white text-2xl"}>{openWork}</p>
                                <p className={"tgrayd2 text-lg"}>{based}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className={"absolute top-[8%] 2xl:top-[14%] right-0"}>
                        <div className={"flex-center px-12 mx-auto"}>
                            <div className={"flex-col-center items-center py-8"}>
                                <motion.div variants={textVariants} initial="initial" animate="animate" className={"lg:ml-0 pr-14 2xl:pr-2"}>
                                    <p className={"xl:text-2xl xl-3:text-3xl 2xl-3:text-3xl 3xl-1:text-4xl tgrayd2 font-bold"}>{name}</p>
                                    <h1 className="xl:text-6xl xl-3:text-7xl 2xl-3:text-7xl 3xl-1:text-8xl text-white font-bold">
                                        {title.split("\n").map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                {index < title.split("\n").length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </h1>
                                </motion.div>
                                <motion.div variants={text2Variants} initial="initial" animate="animate" className={"lg:ml-0"}>
                                    <p className={"lg:ml-0 font-medium mt-11 text-2xl xl-3:text-3xl tblue text-left md:text-justify"}>{freelance}</p>
                                    <p className={"max-w-[550px] xl-3:max-w-[700px] tgrayd2 text-justify text-lg mt-5 font-bold mx-auto"}>{description}</p>
                                </motion.div>
                                <motion.div variants={boxVariants} initial="initial" animate="animate" className={"lg:ml-2 flex-center mt-11"}>
                                    <div className={"flex-center w-52"}>
                                        <Countup value={numberYearsExperience} startValue={"00"}/>
                                        <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                        <div className={"ml-3 max-w-28"}>
                                            <p className={"tgrayd2 font-medium"}>{textYearsExperience}</p>
                                        </div>
                                    </div>
                                    <div className={"flex-center w-52"}>
                                        <Countup value={numberSuccessfulProjects} startValue={"00"}/>
                                        <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                        <div className={"ml-3 max-w-28"}>
                                            <p className={"tgrayd2 font-medium"}>{textSuccessfulProjects}</p>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div variants={boxVariants} initial="initial" animate="animate" className={"flex gap-6 mt-14 items-center ml-4"}>
                                    <button className={`lg:ml-0 btn-xl ${language === "EN" ? "w-56" : language === "FR" ? "w-64" : "w-80"}`} onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = language === "FR" ? CVFR : CV;
                                        link.download = language === "FR" ? 'CV Frédéric Forster.pdf' : 'CV Frédéric Forster - English.pdf';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}>{downloadCV}
                                    </button>
                                    <Link
                                        className={classNames(`lg:ml-0 border tprimary rounded leading-none py-3.5 cursor-pointer shadow focus:ring focus:ring-offset-2 hover:bprimary hover:twhite1 transition uppercase text-base font-bold text-center ${language === "EN" ? "w-56" : language === "FR" ? "w-64" : "w-80"}`)}
                                        to={"about"} smooth={true} duration={800} offset={-68}>
                                        {goToCompetencies}
                                    </Link>
                                </motion.div>
                                <motion.div variants={availableVariants} initial="initial" animate="animate" className={"mt-11"}>
                                    <svg
                                        onClick={() => {
                                            scroller.scrollTo('about', {
                                                smooth: true,
                                                duration: 800,
                                                offset: -68,
                                            });
                                        }}
                                        fill={"var(--primary)"}
                                        viewBox="0 0 256.00 256.00"
                                        width="50"
                                        className={"mx-auto cursor-pointer hover:scale-105 transition infinite-scale"}
                                        id="Flat"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke={"var(--primary)"}
                                        strokeWidth="15.104"
                                    >
                                        <g transform="rotate(180 128 128)">
                                            <path d="M210.82861,205.17188a3.99992,3.99992,0,1,1-5.65722,5.65625L128,133.65723l-77.17139,77.1709a3.99992,3.99992,0,0,1-5.65722-5.65625l80-80a3.99971,3.99971,0,0,1,5.65722,0Zm-160-74.34375L128,53.65723l77.17139,77.1709a3.99992,3.99992,0,0,0,5.65722-5.65625l-80-80a3.99971,3.99971,0,0,0-5.65722,0l-80,80a3.99992,3.99992,0,0,0,5.65722,5.65625Z"></path>
                                        </g>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const CardMobile = () => {
        return (
            <div name={"presentation"} className={"flex-col-center rounded-b-xl pt-28 pb-4 bg-neutral-900 mb-p0 px-6 md:px-14 relative z-10"}>
                <div className={"flex-center items-end w-full"}>
                    <div className={"flex-col-center items-center"}>
                        <div className={"mr-auto"}>
                            <h2 className={"mt-0.5 md:mt-1 tgrayd3 xs:text-lg sm:text-xl md:text-2xl lg:text-3xl"}>{name}</h2>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-left mt-1 font-bold">
                                {title.split("\n").map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < title.split("\n").length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h1>
                        </div>
                        <p className={"lg:ml-0 mt-5 text-2sm md:text-lg lg:text-xl xl:text-2xl tblue mr-auto font-medium"}>{freelance}</p>
                        <p className={"max-w-xl mr-auto text-sm mt-3 mb-10 tgrayd3 text-justify text-2sm md:text-lg font-medium"}>{description}</p>
                        <div className={"flex-center mt-2"}>
                            <div className={"flex-center"}>
                                <p className={"font-medium text-white text-3xl md:text-4xl"}>{numberYearsExperience}</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3 max-w-28"}>
                                    <p className={"text-white font-medium"}>{textYearsExperience}</p>
                                </div>
                            </div>
                            <div className={"flex-center"}>
                                <p className={"font-medium text-white text-3xl md:text-4xl"}>{numberSuccessfulProjects}</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3 max-w-28"}>
                                    <p className={"text-white font-medium"}>{textSuccessfulProjects}</p>
                                </div>
                            </div>
                        </div>
                        <div className={"flex gap-3 mt-12"}>
                            <button className={`lg:ml-0 btn w-40 ${language === "EN" ? "md:w-40" : language === "FR" ? "md:w-52" : "md:w-60"}`} onClick={() => {
                                const link = document.createElement('a');
                                link.href = CV;
                                link.download = language === "FR" ? 'CV Frédéric Forster.pdf' : 'CV Frédéric Forster - English.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}>{downloadCV}
                            </button>
                            <Link
                                className={classNames(
                                    `lg:ml-0 border tprimary rounded leading-none py-3 cursor-pointer hover:bprimary hover:twhite1 transition uppercase text-xs font-bold text-center flex items-center justify-center w-40 ${language === "EN" ? "md:w-40" : language === "FR" ? "md:w-52" : "md:w-60"}`
                                )}
                                to={"about"} smooth={true} duration={500} offset={-68}>
                                {goToCompetencies}
                            </Link>
                        </div>
                    </div>
                </div>
                <img src={PictureMe} className={"w-8/12 md:w-6/12 mx-auto mt-14"}/>
                <div className={"border-bottom-big w-9/12 md:w-6/12 mx-auto mt-1.5 rounded"}/>
                <div className={"grid gap-4 grid-flow-col w-max mx-auto xl:mx-0 mt-10"}>
                    <Tooltip title="LinkedIn: https://linkedin.com/in/frédéric-forster">
                        <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                            <img src={Linkedin} alt="LinkedIn" onClick={() => window.open("https://linkedin.com/in/frédéric-forster")}/>
                        </div>
                    </Tooltip>
                    <Tooltip title="Mail: forster.frederic@gmail.com">
                        <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                            <img src={Mail} alt="Mail" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                        </div>
                    </Tooltip>
                    <Tooltip title="WhatsApp: +33 06 69 01 22 85">
                        <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                            <img src={WhatsApp} alt="WhatsApp" onClick={() => CallWhatsApp()}/>
                        </div>
                    </Tooltip>
                    <Tooltip title="Tel: +33 06 69 01 22 85">
                        <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                            <img src={Phone} alt="WhatsApp" onClick={() => CallPhone()}/>
                        </div>
                    </Tooltip>
                    <Tooltip title="Upwork: https://www.upwork.com/freelancers/~012846dea0085750d1">
                        <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                            <img src={Upwork} alt="Upwork" onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1", "_blank")}/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }

    return (
        windowDimensions.wWCheck(1280) ? <CardDesktop/> : <CardMobile/>
    )
}