import "../css/constants.css"
import React, {useEffect, useRef, useState} from "react";
import Linkedin from "../assets/pictures/linkedin.png";
import Mail from "../assets/pictures/email.png";
import WhatsApp from "../assets/pictures/whatsapp.png";
import * as emailjs from "@emailjs/browser";
import axios from "axios";

export default function Contact({ backendApiUrl, language }) {
    const textareaRef = useRef(null);
    const [title1, setTitle1] = useState("Contact me");
    const [title2, setTitle2] = useState("Let's work together");
    const [touch, setTouch] = useState("Get in touch with me");
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

    const WhatsAppOrCall = () => {
        const whatsappUrl = `https://wa.me/+33669012285`;

        window.open(whatsappUrl, '_blank');
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
        <div name={"contact"} className={"gradient-bg-left min-height-screen flex-col py-24"}>
            <div className={"mx-6 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-32"}>
                <div className={"mx-auto w-max mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"}>
                    <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                    <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>{title1}</p>
                </div>
                <div className={"flex-col-center lg:flex-row w-full lg:mt-24"}>
                    <div className={"text-center mx-auto lg:mx-0 lg:text-left lg:pr-32 md:w-1/2"}>
                        <div className={"lg:w-max"}>
                            <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>{title2}</p>
                        </div>
                        <p className={"md:w-full text-lg md:text-xl lg:text-2xl xl:text-3xl tblack3 lg:mt-10"}>{touch}</p>
                        <div className={"grid gap-4 grid-flow-col w-max lg:w-2/12 mx-auto lg:mx-0 mt-10"}>
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
                        <p className={"w-10/12 md:w-full mx-auto lg:mx-0 mt-10 lg:text-md xl:text-lg tgrayd3 lg:text-justify text-center"}>{text1}</p>
                        <p className={"w-10/12 md:w-full mx-auto lg:mx-0 mt-4 lg:text-md xl:text-lg tgrayd3 lg:text-justify text-center"}>{text2}</p>
                    </div>
                    <form className={"mt-12 mx-auto lg:mt-0 lg:ml-auto flex-col-center items-center 2xl:ml-24 w-full md:w-8/12 lg:w-1/2 2xl:mr-32 bwhite3 rounded-xl shadow-black drop-shadow-lg"} ref={form} onSubmit={sendEmail}>
                        <div className={"w-9/12 mt-14"}>
                            <label htmlFor={"name"} className={"font-medium"}>{nameText}</label>
                            <input id={"name"} name="from_name" type={"text"} className={"tgrayd3 mt-1 border-bottom bwhite3 w-full p-1 outline-none"} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label htmlFor={"email"} className={"font-medium"}>{emailText}</label>
                            <input id={"email"} name="from_mail" type={"text"} className={"tgrayd3 mt-1 border-bottom bwhite3 w-full p-1 outline-none"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label htmlFor={"subject"} className={"font-medium"}>{subjectText}</label>
                            <input id={"subject"} name="subject" type={"text"} className={"tgrayd3 mt-1 border-bottom bwhite3 w-full p-1 outline-none"} value={subject} onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-10"}>
                            <label htmlFor={"auto-resizing-textarea"} className={"font-medium"}>{messageText}</label>
                            <textarea id={"auto-resizing-textarea"} name="message" rows="1" ref={textareaRef} className={"tgrayd3 mt-1 border-bottom bwhite3 w-full p-1 resize-none overflow-hidden outline-none"} value={message} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                        <button className={"btn mt-10 mb-14"}>{sendText}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};