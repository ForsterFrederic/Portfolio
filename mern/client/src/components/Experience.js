import React, { useState } from 'react';
import './../css/constants.css';
import TestImage from "../assets/pictures/wollenschneider.png";

export default function Experience() {
    const [expand, setExpand] = useState(false);
    const items = [
        {name: "Wollenschneider website", img: TestImage, link: "https://wollenschneider.fr", desciption: "Création site web de A à Z pour une entreprise de podo-orthopédie qui n'avais pas de site auparavant. Design créé ensemble avec l'entreprise.", duration: "4 mois", languages: "ReactJS with typescript"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
    ];

    const itemsPerRow = 3;
    const totalItems = items.length;
    const itemsToShow = expand ? totalItems : itemsPerRow * 2;

    return (
        <div name={"experience"} className={"py-12 lg:py-14 xl:py-16 2xl:py-20 gradient-bg-left min-h-lvh"}>
            <div className={"mx-auto w-max mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>My Experiences</p>
            </div>
            <div>
                <div className={"grid md:grid-cols-2 xl:grid-cols-3 gap-8 mx-8 xl:mx-14 justify-items-center"}>
                    {items.slice(0, itemsToShow).map((item, index) => (
                        <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3 hover:bwhite1"} onClick={() => window.open(item.link)}>
                            <div className={"aspect-[16/7] mx-auto border-bottom-medium"}>
                                <img className={"w-full h-full object-cover rounded-t"} src={item.img} alt="Project Image"/>
                            </div>
                            <div className={"flex-col-center w-full p-3 shadow-xl"}>
                                <p className={"font-semibold text-lg mb-2 mx-auto"}>{item.name}</p>
                                <p className={"tgrayd3 text-sm"}>{item.desciption}</p>
                                <p className={"tgrayd3 text-xs mt-2"}>{item.duration + " - " + item.languages}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div onClick={() => setExpand(!expand)}>
                <p className={"btn mt-10 w-28 mx-auto mb-[-12px] text-center text-sm cursor-pointer"}>{expand ? "See less" : "See more"}</p>
            </div>
        </div>
    );
}
