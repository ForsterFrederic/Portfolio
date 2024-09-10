import "../css/constants.css"
import React, {useEffect, useRef, useState} from "react";
import Linkedin from "../assets/pictures/linkedin.png";
import Mail from "../assets/pictures/email.png";
import Upwork from "../assets/pictures/upwork.png";
import * as emailjs from "@emailjs/browser";

export default function Contact() {
    const textareaRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        if (!name || !email || !subject || !message) {
            alert("Fill up every fields please.")
            return
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address.")
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
                    alert('Your message has been delivered and I will get back to you as soon as possible.');
                },
                (error) => {
                    alert('Unfortunately, your message could not be delivered. Please try again later.');
                },
            );
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
        <div name={"contact"} className={"gradient-bg-right min-height-screen flex-col py-24"}>
            <div className={"mx-6 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-32"}>
                <div className={"mx-auto w-max mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"}>
                    <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                    <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Contact me</p>
                </div>
                <div className={"flex-col-center lg:flex-row w-full lg:mt-24"}>
                    <div className={"text-center mx-auto lg:mx-0 lg:text-left lg:pr-32 md:w-1/2"}>
                        <div className={"lg:w-max"}>
                            <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Let's work together</p>
                        </div>
                        <p className={"md:w-full text-lg md:text-xl lg:text-2xl xl:text-3xl tblack3 lg:mt-32"}>Get in touch with me</p>
                        <div className={"grid gap-4 grid-flow-col w-max lg:w-2/12 mx-auto lg:mx-0 mt-10"}>
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
                        <p className={"w-10/12 md:w-full mx-auto lg:mx-0 mt-8 lg:text-md xl:text-lg tgrayd3 lg:text-justify text-center"}>I'm always open to new opportunities and collaborations. Feel free to get in touch with me through the contact form on the right or via LinkedIn, GitHub, or email.</p>
                    </div>
                    <form className={"mt-12 mx-auto lg:mt-0 lg:ml-auto flex-col-center items-center 2xl:ml-24 w-full md:w-8/12 lg:w-1/2 2xl:mr-32 bwhite3 rounded-xl shadow-black drop-shadow-lg"} ref={form} onSubmit={sendEmail}>
                        <div className={"w-9/12 mt-14"}>
                            <label htmlFor={"name"} className={"font-medium"}>Enter your name</label>
                            <input id={"name"} name="from_name" type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label htmlFor={"email"} className={"font-medium"}>Your email address</label>
                            <input id={"email"} name="from_mail" type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label htmlFor={"subject"} className={"font-medium"}>Subject</label>
                            <input id={"subject"} name="subject" type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} value={subject} onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-10"}>
                            <label htmlFor={"auto-resizing-textarea"} className={"font-medium"}>Write a message</label>
                            <textarea id={"auto-resizing-textarea"} name="message" rows="1" ref={textareaRef} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 resize-none overflow-hidden outline-none"} value={message} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                        <button className={"btn mt-10 mb-14"}>Send message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};