import "../../css/constants.css"
import {useEffect, useRef, useState} from "react";

export default function Contact() {
    const textareaRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

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
        <div className={"bgrayl1 shadow py-16"}>
            <div className={"md:mx-14 lg:mx-20 xl:mx-40 2xl:mx-44 "}>
                <div className={"mx-auto md:mx-0 w-4/6"}>
                    <div className={"w-max"}>
                        <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                        <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Let's work together</p>
                    </div>
                    {/*<div className={"grid gap-4 grid-cols-3"}>*/}
                    {/*    <div className={"w-20 h-20 bg-gray-800"}>*/}

                    {/*    </div>*/}
                    {/*    <div className={"w-20 h-20 bg-gray-800"}>*/}

                    {/*    </div>*/}
                    {/*    <div className={"w-20 h-20 bg-gray-800"}>*/}

                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className={"flex-col-center md:flex-row w-full md:mt-4"}>
                    <div className={"mx-auto md:mx-0 w-4/6 md:w-2/6"}>
                        <p className={"md:w-full mt-10 text-lg md:text-xl lg:text-2xl xl:text-3xl tblack3"}>Get in touch with me</p>
                        <p className={"md:w-full mt-4 md:text-sm lg:text-md xl:text-lg tgrayd3"}>Lorem ipsum dolor sit amet consectetur adipisci elit donec faucibus adipiscing mauris.</p>
                    </div>
                    <div className={"w-4/6 mt-10 md:mt-0 mx-auto md:mx-0 md:ml-14 lg:ml-auto lg:mr-auto flex-col-center items-center md:w-7/12 lg:w-5/12 bwhite3 justify-between rounded-xl shadow-black drop-shadow-lg"}>
                        <div className={"w-9/12 mt-14"}>
                            <label form={"name"} className={"font-medium"}>Enter your name</label>
                            <input id={"name"} type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label form={"email"} className={"font-medium"}>Your email address</label>
                            <input id={"email"} type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-7"}>
                            <label form={"subject"} className={"font-medium"}>Subject</label>
                            <input id={"subjet"} type={"text"} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 outline-none"} onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                        <div className={"w-9/12 mt-10"}>
                            <label form={"auto-resizing-textarea"} className={"font-medium"}>Write a message</label>
                            <textarea id={"auto-resizing-textarea"} rows="1" ref={textareaRef} className={"tgrayd3 text-sm mt-1 border-bottom bwhite3 w-full p-1 resize-none overflow-hidden outline-none"} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                        <button className={"btn mt-10 mb-14"} onClick={() => alert("Name: "+name+"\nEmail: "+email+"\nSubject: "+subject+"\nMessage: "+message)}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};