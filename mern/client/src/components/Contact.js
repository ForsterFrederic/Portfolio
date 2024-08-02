import "../css/constants.css"
import React, {useEffect, useRef, useState} from "react";
import LinkedinOutline from "../assets/pictures/social/linkedin/linkedin-outline.png"
import LinkedinFull from "../assets/pictures/social/linkedin/linkedin-full.png"
import GithubOutline from "../assets/pictures/social/github/github-outline.png"
import GithubFull from "../assets/pictures/social/github/github-full.png"
import MailOutline from "../assets/pictures/social/mail/mail-outline.png"
import MailFull from "../assets/pictures/social/mail/mail-full.png"
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

        emailjs
            .sendForm('service_7niq44i', 'template_portfolio', form.current, {
                publicKey: 's1RUlrjy3XIg8ryO4',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
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
        <div className={"py-12 lg:py-14 xl:py-16 2xl:py-20 gradient-bg-left"}>
            <div className={"mx-12 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-32"}>
                <div className={"mx-auto w-max mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"}>
                    <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                    <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Contact me</p>
                </div>
                <div className={"flex-col-center lg:flex-row w-full mt-12"}>
                    <div className={"text-center mx-auto lg:mx-0 lg:text-left w-4/6 md:w-3/6 lg:w-2/6 xl:w-2/6"}>
                        <div className={"lg:w-max"}>
                            <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Let's work together</p>
                        </div>
                        <p className={"md:w-full text-lg md:text-xl lg:text-2xl xl:text-3xl tblack3 lg:mt-32"}>Get in touch with me</p>
                        <div className={"grid gap-4 grid-flow-col w-max lg:w-2/12 mx-auto lg:mx-0 mt-10"}>
                            <div className="icon w-10 h-10 cursor-pointer">
                                <img src={LinkedinOutline} alt="LinkedIn" className="outline"/>
                                <img src={LinkedinFull} alt="LinkedIn Full" className="full"/>
                            </div>
                            <div className="icon w-10 h-10 cursor-pointer">
                                <img src={GithubOutline} alt="GitHub" className="outline"/>
                                <img src={GithubFull} alt="GitHub Full" className="full"/>
                            </div>
                            <div className="icon w-10 h-10 cursor-pointer">
                                <img src={MailOutline} alt="Mail" className="outline" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                                <img src={MailFull} alt="Mail Full" className="full" onClick={() => window.location.href = "mailto:forster.frederic@gmail.com"}/>
                            </div>
                        </div>
                        <p className={"w-full mt-8 lg:text-md xl:text-lg tgrayd3"}>Lorem ipsum dolor sit amet consectetur adipisci elit donec faucibus adipiscing mauris. Lorem ipsum dolor sit amet consectetur adipisci elit donec faucibus adipiscing mauris.</p>
                    </div>
                    <form className={"mt-12 mx-auto lg:mt-0 ml-auto flex-col-center items-center w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 2xl:mr-32 bwhite3 rounded-xl shadow-black drop-shadow-lg"} ref={form} onSubmit={sendEmail}>
                        <div className={"w-9/12 mt-14"}>
                            <label form={"name"} className={"font-medium"}>Enter your name</label>
                            <input id={"name"} name="from_name" type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label form={"email"} className={"font-medium"}>Your email address</label>
                            <input id={"email"} name="from_mail" type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label form={"subject"} className={"font-medium"}>Subject</label>
                            <input id={"subjet"} name="subject" type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-10"}>
                            <label form={"auto-resizing-textarea"} className={"font-medium"}>Write a message</label>
                            <textarea id={"auto-resizing-textarea"} name="message" rows="1" ref={textareaRef} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 resize-none overflow-hidden outline-none"} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                        <button className={"btn mt-10 mb-14"} onClick={() => alert("Name: "+name+"\nEmail: "+email+"\nSubject: "+subject+"\nMessage: "+message)}>Send message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};