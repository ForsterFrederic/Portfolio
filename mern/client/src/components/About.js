import React from 'react';
import './../css/constants.css';
import Picture from "../assets/pictures/full-stack.png"

export default function About() {
    return (
        <div name="about" className={"min-height-screen flex-col gradient-bg-left pb-40"}>
            <div className={"pt-36 mx-auto w-max mb-10 xl:mb-12 2xl:mb-24"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>About me</p>
            </div>
            <div className={"flex flex-col lg:flex-row mx-16 md:mx-20 lg:mx-16 xl:mx-32 2xl:mx-36 mt-32"}>
                <div className={"flex-row lg:mr-36 xl:mr-44 2xl:mr-52 my-auto text-justify"}>
                    <p className={"md:text-lg lg:text-lg xl:text-xl tgrayd3 max-w-3xl text-center lg:text-left mx-auto lg:mx-0 lg:max-w-full"}>I am a Full Stack Developer, graduating from Epitech with a focus on React and Node.js.</p>
                    <p className={"md:text-lg lg:text-lg xl:text-xl tgrayd3 max-w-3xl text-center lg:text-left mx-auto lg:mx-0 lg:max-w-full mt-8"}>I design innovative web solutions by integrating comprehensive expertise, from front-end to back-  end, along with proficiency in low-level languages.</p>
                    <p className={"md:text-lg lg:text-lg xl:text-xl tgrayd3 max-w-3xl text-center lg:text-left mx-auto lg:mx-0 lg:max-w-full mt-8"}>I am seeking a full-time role where I can contribute my skills and collaborate effectively for long-term growth.</p>
                </div>
                <img className={"w-full sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-5/12 2xl:w-2/6 rounded-3xl 2xl:mr-32 my-auto mx-auto lg:mx-0 mt-20 lg:mt-0 mb-52 lg:mb-0"} src={Picture}/>
            </div>
        </div>
    );
}