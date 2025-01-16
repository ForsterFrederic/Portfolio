import React, { useEffect, useState } from 'react';
import {scroller, animateScroll} from 'react-scroll';
import axios from "axios";
import {Bounce, toast} from "react-toastify";

export default function Footer({ backendApiUrl, language }) {
    const [rights, setRights] = useState("©2024 Frédéric Forster. All Rights Reserved.");
    const [mern, setMern] = useState("This custom MERN stack website showcases my portfolio, featuring a responsive design and dynamic functionality.");
    const [top, setTop] = useState("GO TO TOP");
    const [resume, setResume] = useState("I create innovative software solutions, blending web technologies, low-level programming, and creative problem-solving.");
    const [call, setCall] = useState("BOOK A CALL");
    const [contact, setContact] = useState("CONTACT");
    const [info, setInfo] = useState("INFO");
    const [menu, setMenu] = useState("MENU");
    const [social, setSocial] = useState("SOCIAL");
    const [mernTitle, setMernTitle] = useState("About This Website");
    const [about, setAbout] = useState("About");
    const [competencies, setCompetencies] = useState("Competencies");
    const [experiences, setExperiences] = useState("Experience");
    const [home, setHome] = useState("Home");
    const [mail, setMail] = useState("Email");
    const [privacy, setPrivacy] = useState("Privacy");
    const [projects, setProjects] = useState("Projects");
    const [terms, setTerms] = useState("Terms");

    const getFooter = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/footer/${language}`);

            setRights(response.data.rights);
            setMern(response.data.mern);
            setTop(response.data.top);
            setResume(response.data.resume);
            setCall(response.data.call);
            setContact(response.data.contact);
            setInfo(response.data.info);
            setMenu(response.data.menu);
            setSocial(response.data.social);
            setMernTitle(response.data.mernTitle);
            setAbout(response.data.about);
            setCompetencies(response.data.competencies);
            setExperiences(response.data.experiences);
            setHome(response.data.home);
            setMail(response.data.mail);
            setPrivacy(response.data.privacy);
            setProjects(response.data.projects);
            setTerms(response.data.terms);
        } catch (error) {
            console.error('Error fetching footer:', error);
        }
    };

    useEffect(() => {
        getFooter();
    }, [language]);

    const CallWhatsApp = () => {
        const whatsappUrl = `https://wa.me/+33669012285`;

        window.open(whatsappUrl, '_blank');
    };

    const handleCalendlyPopup = () => {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: 'https://calendly.com/forster-frederic',
            });

            setTimeout(() => {
                const popup = document.querySelector('.calendly-popup');
                const overlay = document.querySelector('.calendly-popup-overlay');

                if (popup) {
                    popup.style.zIndex = '2147483647';
                }
                if (overlay) {
                    overlay.style.zIndex = '2147483646';
                }
            }, 500);
        } else {
            toast.error(language === "EN" ? "An error occured, please try later..." : language === "FR" ? "Une erreur est survenue, veuillez réessayer plus tard..." : "Ein Fehler ist aufgetreten, bitte versuche es später noch einmal...", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            console.error('Calendly script not loaded yet.');
        }
    };

    return (
        <footer className="bg-neutral-800 text-neutral-400 sticky bottom-0">
            <div className="pt-8 pb-4 text-center">
                <svg
                    onClick={() => animateScroll.scrollToTop()}
                    fill="#e28413"
                    viewBox="0 0 256 256"
                    width="40"
                    className="mx-auto cursor-pointer hover:scale-110 transition-transform"
                >
                    <path d="M210.8,205.2a4,4,0,0,1-5.7,5.7L128,133.7l-77.2,77.2a4,4,0,0,1-5.7-5.7l80-80a4,4,0,0,1,5.7,0ZM50.8,130.8,128,53.7l77.2,77.1a4,4,0,0,0,5.7-5.7l-80-80a4,4,0,0,0-5.7,0l-80,80a4,4,0,0,0,5.7,5.7Z"></path>
                </svg>
                <p className="text-md uppercase mt-2">{top}</p>
            </div>

            <div className="py-8 px-6 md:px-12 xl:px-20">
                <div className="grid gap-8 xl:grid-cols-3 w-full">
                    <div className="hidden xl:flex flex-col items-start justify-between max-w-80">
                        <img src="/logo2.webp" alt="Logo" className="w-32 mb-6" />
                        <p className="max-w-xs mb-6">{resume}</p>
                        <div className="flex gap-4 w-full">
                            <button onClick={() => {scroller.scrollTo('contact', {smooth: true, duration: 800, offset: -68,})}} className="btn py-2 w-1/2">{contact}</button>
                            <button onClick={handleCalendlyPopup} className="py-3 w-1/2 border rounded leading-none px-6 cursor-pointer mx-2 hover:bprimary hover:twhite1 transition uppercase text-xs font-medium text-center">{call}</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 text-center">
                        <div>
                            <p className="text-neutral-200 uppercase text-left md:text-center font-bold mb-4">{menu}</p>
                            <ul className="grid md:block grid-cols-3 text-left md:text-center md:space-y-2">
                                <li><a onClick={() => {scroller.scrollTo('presentation', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{home}</a></li>
                                <li><a onClick={() => {scroller.scrollTo('about', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{about}</a></li>
                                <li><a onClick={() => {scroller.scrollTo('competencies', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{competencies}</a></li>
                                <li><a onClick={() => {scroller.scrollTo('experience', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{experiences}</a></li>
                                <li><a onClick={() => {scroller.scrollTo('projects', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{projects}</a></li>
                                <li><a onClick={() => {scroller.scrollTo('contact', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{contact}</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-neutral-200 uppercase text-left md:text-center font-bold mb-4">{info}</p>
                            <ul className="grid md:block grid-cols-3 text-left md:text-center md:space-y-2">
                                <li><a href="/terms" className="cursor-pointer hover:tprimary">{terms}</a></li>
                                <li><a href="/privacy" className="cursor-pointer hover:tprimary">{privacy}</a></li>
                                <li><a onClick={() => {scroller.scrollTo('contact', {smooth: true, duration: 800, offset: -68,})}} className="cursor-pointer hover:tprimary">{contact}</a></li>
                                <li><a onClick={handleCalendlyPopup} className="cursor-pointer hover:tprimary">{call}</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-neutral-200 uppercase text-left md:text-center font-bold mb-4">{social}</p>
                            <ul className="grid md:block grid-cols-3 text-left md:text-center md:space-y-2">
                                <li><a onClick={() => window.open("https://linkedin.com/in/frédéric-forster")} className="cursor-pointer hover:tprimary">LinkedIn</a></li>
                                <li><a onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"} className="cursor-pointer hover:tprimary">{mail}</a></li>
                                <li><a onClick={() => CallWhatsApp()} className="cursor-pointer hover:tprimary">WhatsApp</a></li>
                                <li><a onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1", "_blank")} className="cursor-pointer hover:tprimary">Upwork</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-start ml-auto max-w-80">
                        <p className="text-neutral-200 font-bold mb-2">{mernTitle}</p>
                        <p className={"mt-3"}>{mern}</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-neutral-700 py-4 text-center text-md">
                <p>{rights}</p>
            </div>
        </footer>
    );
}