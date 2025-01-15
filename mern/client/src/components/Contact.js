import "../css/constants.css"
import React, {useEffect, useRef, useState} from "react";
import Linkedin from "../assets/pictures/linkedin2.webp";
import Mail from "../assets/pictures/email2.webp";
import WhatsApp from "../assets/pictures/whatsapp2.webp";
import Phone from "../assets/pictures/phone2.webp";
import Upwork from "../assets/pictures/upwork2.webp";
import * as emailjs from "@emailjs/browser";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import {Bounce, toast} from "react-toastify";
import AnimatedParagraph from "./AnimatedParagraph";

export default function Contact({ backendApiUrl, language }) {
    const textareaRef = useRef(null);
    const [title1, setTitle1] = useState("Contact me");
    const [title2, setTitle2] = useState("Let's work together");
    const [touch, setTouch] = useState("Get in touch with me");
    const [call, setCall] = useState("BOOK A VIDEO CALL WITH ME");
    const [text1, setText1] = useState("I am always open to exploring new opportunities and collaborations. Whether you're looking for a skilled developer for your project, seeking advice, or simply want to connect, I’m here to help!");
    const [text2, setText2] = useState("Please feel free to reach out through the contact form on the right, or connect with me on LinkedIn, GitHub, or via email. I look forward to discussing how we can collaborate to create impactful solutions together!");
    const [nameText, setNameText] = useState("Enter your name");
    const [emailText, setEmailText] = useState("Your email address");
    const [subjectText, setSubjectText] = useState("Subject");
    const [messageText, setMessageText] = useState("Write a message");
    const [sendText, setSendText] = useState("Send message");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const form = useRef();

    const getContact = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/contact/` + language);
            setTitle1(response.data.title1);
            setTitle2(response.data.title2);
            setTouch(response.data.getInTouch);
            setCall(response.data.call);
            setText1(response.data.text1);
            setText2(response.data.text2);
            setNameText(response.data.name);
            setEmailText(response.data.mail);
            setSubjectText(response.data.subject);
            setMessageText(response.data.message);
            setSendText(response.data.send);
        } catch (error) {
            console.error('Error fetching contact:', error);
        }
    };

    useEffect(() => {
        getContact()
    }, [language]);

    const sendEmail = (e) => {
        e.preventDefault();

        if (!name || !email || !subject || !message) {
            toast.warning("Fill up every fields please.", {
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
            return
        }

        if (!email.includes("@") || !email.includes(".")) {
            toast.warning("Please enter a valid email address.", {
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
            return
        }

        emailjs
            .sendForm('service_7niq44i', 'template_portfolio', form.current, {
                publicKey: 's1RUlrjy3XIg8ryO4',
            })
            .then(
                () => {
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                    toast.success('Your message has been delivered and I will get back to you as soon as possible.', {
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
                },
                (error) => {
                    toast.error('Unfortunately, your message could not be delivered. Please try again later.', {
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
                },
            );
    };

    const CallWhatsApp = () => {
        const whatsappUrl = `https://wa.me/+33669012285`;

        window.open(whatsappUrl, '_blank');
    };

    const CallPhone = () => {
        const phoneUrl = `Tel: +33 06 69 01 22 85`;
        window.open(phoneUrl, '_self');
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        const autoResize = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };

        textarea.addEventListener('input', autoResize);
        autoResize();
        return () => {
            textarea.removeEventListener('input', autoResize);
        };
    }, []);

    return (
        <div name={"contact"} className={"min-height-screen shadow-2xl flex-col py-24 bg-neutral-900 rounded-b-3xl"}>
            <div className={"mx-6 md:mx-14 xl:mx-20 xl:mx-28 2xl:mx-32"}>
                <div className={"mx-auto w-max mb-12 xl:mb-16 2xl:mb-28"}>
                    <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"} />
                    <p className={"text-4xl md:text-5xl xl:text-5xl xl:text-6xl font-bold text-white"}>{title1}</p>
                </div>
                <div className={"flex-col-center xl:flex-row w-full xl:mt-24"}>
                    <div className={"text-center mx-auto xl:mx-0 xl:text-left xl:pr-32 xl:w-1/2"}>
                        <div className={"xl:w-max"}>
                            <p className={"text-2xl md:text-3xl xl:text-4xl xl:text-5xl tprimary"}>{title2}</p>
                        </div>
                        <p className={"md:w-full text-lg md:text-xl xl:text-2xl xl:text-3xl tgrayd2 xl:mt-10"}>{touch}</p>
                        <div className={"grid gap-4 grid-flow-col w-max xl:w-2/12 mx-auto xl:mx-0 mt-8"}>
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
                                    <img src={Phone} alt="Phone" onClick={() => CallPhone()}/>
                                </div>
                            </Tooltip>
                            <Tooltip title="Upwork: https://www.upwork.com/freelancers/~012846dea0085750d1">
                                <div className="w-10 h-10 cursor-pointer hover:scale-105 transition">
                                    <img src={Upwork} alt="Upwork" onClick={() => window.open("https://www.upwork.com/freelancers/~012846dea0085750d1", "_blank")}/>
                                </div>
                            </Tooltip>
                        </div>
                        <button className={"xl:mt-5 mt-5 border py-4 rounded leading-none px-8 cursor-pointer text-sm hover:bprimary hover:twhite1 transition uppercase font-medium text-center"}>{call}</button>
                        <div className={"w-full mx-auto xl:mx-0 mt-16"}>
                            <AnimatedParagraph value={[text1, <br />, <br />, text2]} />
                        </div>
                    </div>
                    <form className={"mt-12 mx-auto xl:mt-0 xl:ml-auto flex-col-center items-center 2xl:ml-24 w-full xl:w-1/2 2xl:mr-32 bg-neutral-800 rounded-xl shadow-2xl drop-shadow-lg"} ref={form} onSubmit={sendEmail}>
                        <div className={"w-10/12 xl:w-9/12 mt-12"}>
                            <label htmlFor={"name"} className={"font-medium text-lg mb-1"}>{nameText}</label>
                            <input id={"name"} name="from_name" type={"text"} className={"tgrayl2 mt-1 border-bottom bg-neutral-700 w-full p-1 outline-none rounded"} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={"w-10/12 xl:w-9/12 mt-7"}>
                            <label htmlFor={"email"} className={"font-medium text-lg mb-1"}>{emailText}</label>
                            <input id={"email"} name="from_mail" type={"text"} className={"tgrayl2 mt-1 border-bottom bg-neutral-700 w-full p-1 outline-none rounded"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={"w-10/12 xl:w-9/12 mt-7"}>
                            <label htmlFor={"subject"} className={"font-medium text-lg mb-1"}>{subjectText}</label>
                            <input id={"subject"} name="subject" type={"text"} className={"tgrayl2 mt-1 border-bottom bg-neutral-700 w-full p-1 outline-none rounded"} value={subject} onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                        <div className={"w-10/12 xl:w-9/12 mt-10"}>
                            <label htmlFor={"auto-resizing-textarea"} className={"font-medium text-lg mb-1"}>{messageText}</label>
                            <textarea id={"auto-resizing-textarea"} name="message" rows="3" ref={textareaRef} className={"rounded tgrayl2 mt-1 border-bottom bg-neutral-700 w-full p-1 resize-none overflow-hidden outline-none"} value={message} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                        <button id={"send-contact-mail"} className={"btn mt-10 mb-12"}>{sendText}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};