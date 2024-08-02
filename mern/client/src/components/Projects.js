import TestImage from "./../assets/pictures/wollenschneider.png";
import React from "react";

export default function Projects() {
    const items = [
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
        {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
    ];

    return (
        <div className={"py-12 lg:py-14 xl:py-16 2xl:py-20 gradient-bg-right"}>
            <div className={"mx-auto w-max mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"}>
                <div className={"bprimary mx-auto w-28 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>Public projects</p>
            </div>
            <div>
                <div className={"grid md:grid-cols-2 xl:grid-cols-3 gap-8 mx-8 xl:mx-14 justify-items-center"}>
                    {items.map((item, index) => (
                            <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3 hover:bwhite1"}>
                                <div className={"aspect-[16/7] mx-auto border-bottom-medium"}>
                                    <img className={"w-full h-full object-cover rounded-t"} src={item.img} alt="Project Image"/>
                                </div>
                                <div className={"flex-col-center w-full p-3 shadow-xl"}>
                                    <p className={"font-semibold text-lg mb-2 mx-auto"}>{item.name}</p>
                                    <p className={"tgrayd3"}>{item.desciption}</p>
                                    <p className={"tgrayd3"}>{item.duration}</p>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// import TestImage from "./../assets/pictures/wollenschneider.png";
// import React from "react";
//
// export default function Projects() {
//     const items = [
//         {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
//         {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
//         {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
//         {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
//         {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
//         {name: "Wollenschneider website", img: TestImage, link: "", desciption: "description", duration: "durée"},
//     ];
//
//     return (
//         <div className={"py-20"}>
//             <div className={"ml-28 w-max mb-14"}>
//                 <div className={"bprimary w-24 h-1.5 rounded mb-3"}/>
//                 <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>My Projects</p>
//             </div>
//             <div>
//                 <div className={"grid md:grid-cols-2 xl:grid-cols-3 gap-8 mx-8 xl:mx-14 justify-items-center"}>
//                     {items.map((item, index) => (
//                         <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3 bg-[#111111] hover:bwhite1 border-2 border-[#4F595C]"}>
//                             <div className={"aspect-[16/7] mx-auto border-bottom-medium"}>
//                                 <img className={"w-full h-full object-cover rounded-t"} src={item.img} alt="Project Image"/>
//                             </div>
//                             <div className={"flex-col-center w-full p-3 shadow-xl"}>
//                                 <p className={"font-semibold text-lg mb-2 mx-auto"}>{item.name}</p>
//                                 <p className={"tgrayd3"}>{item.desciption}</p>
//                                 <p className={"tgrayd3"}>{item.duration}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };