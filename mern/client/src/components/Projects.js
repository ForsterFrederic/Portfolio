import Wollenschneider from "./../assets/pictures/wollenschneider.png";
import ThomSchrama from "./../assets/pictures/thomschrama.png";
import React, { useState, useEffect } from "react";

export default function Projects() {
    const [expand, setExpand] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(0);

    const items = [
        { name: "Wollenschneider website", img: Wollenschneider, link: "https://wollenschneider.fr", desciption: "Created a complete website showcasing the company, its various activities, a contact page, a history page, and individual pages for each office.", duration: "4 months", languages: "ReactJS with typescript" },
        { name: "Thom Schrama", img: ThomSchrama, link: "https://thomschrama.com", desciption: "A dedicated personal platform designed to highlight professional achievements, showcase company initiatives, and present forward-thinking projects that inspire innovation and growth.", duration: "1 month", languages: "ReactJS with typescript" },
    ];

    function getItemsToShow() {
        if (window.innerWidth >= 1280) {
            return expand ? items.length : 4; // xl
        } else if (window.innerWidth >= 1024) {
            return expand ? items.length : 4; // lg
        } else if (window.innerWidth >= 768) {
            return expand ? items.length : 4; // md
        } else {
            return expand ? items.length : 3; // sm
        }
    }

    const updateItemsToShow = () => {
        const count = getItemsToShow();
        setItemsToShow(count);
    };

    useEffect(() => {
        updateItemsToShow();
        window.addEventListener("resize", updateItemsToShow);
        return () => window.removeEventListener("resize", updateItemsToShow)
    }, [expand]);

    return (
        <div name={"projects"} className={"gradient-bg-left pb-14"}>
            <div className={"pt-52 mb-24 mx-auto w-max"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Public projects</p>
            </div>
            <div>
                <div className="grid gap-6 xl:gap-8 2xl:gap-12 mx-6 sm:mx-14 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {items.slice(0, itemsToShow).map((item, index) => (
                        <div key={index} className="cursor-pointer hover:scale-105 rounded-lg shadow-md hover:shadow-xl transition bwhite1 flex flex-col border-1 border-primary hover:border-secondary" onClick={() => window.open(item.link)}>
                            <p className="font-medium text-xl lg:text-3xl mt-6 text-center">{item.name}</p>
                            <div className="bgrayd2 mx-auto w-2/12 h-1 mt-1 relative rounded mb-1"/>
                            <div className="relative w-full overflow-hidden">
                                <div className="relative w-full overflow-hidden corner-cross-frame">
                                    <div className="aspect-[16/6] md:aspect-[16/8] lg:aspect-[16/8] xl:aspect-[16/6] w-full">
                                        <img className="p-6 w-full h-full object-cover object-top rounded-t" src={item.img} alt="Project Image"/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full px-6 pb-6 flex-grow">
                                <p className="tgrayd3 text-sm lg:text-base font-light text-justify">{item.desciption}</p>
                                <p className="mt-auto tgrayd3 text-xs lg:text-sm pt-3 font-light">
                                    {item.duration + (item.languages ? " - " + item.languages : "") + (item.link ? " - " + item.link : "")}
                                </p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            {itemsToShow < items.length || expand ? (
                <div onClick={() => setExpand(!expand)}>
                    <p className={"btn mt-10 w-28 mx-auto text-center text-sm cursor-pointer"}>
                        {expand ? "Collapse" : "Expand"}
                    </p>
                </div>
            ) : null}
        </div>
    );
}
