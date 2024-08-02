import React, { useState } from 'react';
import './../css/constants.css';

export default function About() {
    return (
        <div className={"py-12 lg:py-14 xl:py-16 2xl:py-20 gradient-bg-left"}>
            <div className={"mx-auto w-max mb-10 xl:mb-12 2xl:mb-14 mt-10"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>About me</p>
            </div>
            <p className={"mx-16 md:mx-20 lg:mx-32 xl:mx-44 2xl:mx-60 md:text-lg lg:text-xl xl:text-2xl tgrayd3 text-center"}>I have acquired and sharpened m ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum vn organization. I
                am trustworthy, creative, and an effective communicator. I fondly anticipate working in a
                challenging yet rewarding organization to attain its visions for personal growth.</p>
        </div>
    );
}