import React, { useState } from 'react';
import Dropdown from "../assets/pictures/down-arrow.png"
import './../css/constants.css';

export default function Competencies() {
    const [expand, setExpand] = useState(false);
    const items = [
        {name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", link: ""},
        {name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", link: ""},
        {name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", link: ""},
        {name: "Github", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", link: ""},
        {name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", link: ""},
        {name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", link: ""},
        {name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", link: ""},
        {name: "Github", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", link: ""},
        {name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", link: ""},
        {name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", link: ""},
        {name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", link: ""},
        {name: "Github", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", link: ""},
        {name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", link: ""},
        {name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", link: ""},
        {name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", link: ""},
        {name: "Github", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", link: ""},
        {name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", link: ""},
        {name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", link: ""},
        {name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", link: ""},
        {name: "Github", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", link: ""},
    ];

    const itemsPerRow = 8;
    const totalItems = items.length;
    const itemsToShow = expand ? totalItems : itemsPerRow * 2;

    return (
        <div className={"py-12 lg:py-14 xl:py-16 2xl:py-20 gradient-bg-right"}>
            <div className={"mx-auto w-max mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>My Competencies</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 mx-8 sm:mx-14 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40">
                {items.slice(0, itemsToShow).map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center justify-center mb-2 w-32 h-32 rounded-lg mx-auto backdrop-blur-xl bg-white/30 shadow-md transition-transform transform hover:scale-105 cursor-pointer tgrayd3 ${!expand && index >= itemsPerRow ? 'hover:fade-opacity' : ''}`}
                        onClick={() => window.open(item.link)}
                    >
                        <img className="w-14 h-14 mb-3" src={item.img}></img>
                        <p className="text-center text-sm">{item.name}</p>
                    </div>
                ))}
            </div>
            <div onClick={() => setExpand(!expand)}>
                <svg width="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#2563eb" className={"rotate-180 mx-auto mt-8 cursor-pointer"}>
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
            </div>
        </div>
    );
}


// import React, { useState } from 'react';
// import Bash from "../assets/svg/bash.svg"
// import './../css/constants.css';
//
// export default function Competencies() {
//     const [expand, setExpand] = useState(false);
//     const items = [
//         {name: "Bash", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", link: ""},
//         {name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", link: ""},
//         {name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", link: ""},
//         {name: "Github", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", link: ""},
//     ];
//
//     const itemsPerRow = 8;
//     const totalItems = items.length;
//     const itemsToShow = expand ? totalItems : itemsPerRow * 2;
//
//     return (
//         <div className={"py-24 shadow"}>
//             <div className={"ml-28 w-max mb-14"}>
//                 <div className={"bprimary w-24 h-1.5 rounded mb-3"}/>
//                 <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>My Competencies</p>
//             </div>
//             <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 mx-40">
//                 {items.slice(0, itemsToShow).map((item, index) => (
//                     <div
//                         key={index}
//                         className={`flex flex-col items-center justify-center w-32 h-28 mx-auto transition-transform transform hover:scale-105 cursor-pointer tgrayd3 ${!expand && index >= itemsPerRow ? 'hover:fade-opacity' : ''}`}
//                         onClick={() => window.open(item.link)}
//                     >
//                         <img className="w-14 h-14  mb-1.5 rounded" src={item.img}></img>
//                         <p className="text-center text-sm">{item.name}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="w-full flex justify-center mt-8">
//                 <button onClick={() => setExpand(!expand)} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
//                     {expand ? 'Collapse' : 'Expand'}
//                 </button>
//             </div>
//         </div>
//     );
// }
