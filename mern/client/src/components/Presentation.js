import "./../css/constants.css"
import {useEffect, useState} from "react";

export default function Presentation() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [title, setTitle] = useState("FORSTER Frédéric")
    const [subtitle, setSubtitle] = useState("Software & Web Engineer")
    const [description, setDescription] = useState("As technology, I remain committed to continuous learning and staying updated with the latest industry trends.")

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    const CardDesktop = () => {
        return (
            <div className={"gradient-bg-left-darker shadow-black drop-shadow-lg pt-[100px]"}>
                <div className={"bg-[url('assets/pictures/picture-me.png')] bg-left-top bg-cover flex justify-between mx-5 aspect-[16/6] rounded-xl shadow-black drop-shadow"}>
                    <div className={"flex-col-center items-end w-full"}>
                        <div className={"flex-col-center md:pl-80 lg: pl-0 items-center xl:mr-6 2xl:mr-8 py-8"}>
                            <div className={"lg:ml-0"}>
                                <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                                <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl tblack3"}>{title}</h1>
                            </div>
                            <h2 className={"lg:ml-0 font-light mt-0.5 md:mt-1 lg:mt-2 tgrayd3 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>{subtitle}</h2>
                            <p className={"lg:ml-0 w-7/12 text-center mt-7 tgrayd3 text-2sm md:text-xs lg:text-sm xl:text-lg"}>{description}</p>
                            <div className={"lg:ml-0 flex-center gap-x-8 lg:gap-x-14 mt-16"}>
                                <div className={"flex-center"}>
                                    <p className={"font-medium tblack2 text-3xl md:text-4xl lg:text-5xl xl:text-5xl"}>5</p>
                                    <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"tblack1 font-medium"}>Years of</p>
                                        <p className={"tblack1 font-medium"}>experience</p>
                                    </div>
                                </div>
                                <div className={"flex-center"}>
                                    <p className={"font-medium tblack2 text-3xl md:text-4xl lg:text-5xl xl:text-5xl"}>11</p>
                                    <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl lg:text-3xl xl:text-3xl"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"tblack2 font-medium"}>Successful</p>
                                        <p className={"tblack2 font-medium"}>projects</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex gap-3 mt-14"}>
                                <button className={"lg:ml-0 btn w-44"}>Download my CV</button>
                                <button className={"lg:ml-0 border tprimary rounded leading-none px-6 py-2 cursor-pointer mx-2 hover:bprimary hover:twhite1 transition uppercase text-xs font-bold"}>Check out my work</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const CardMobile = () => {
        return (
            <div className={"flex-col-center rounded-b-xl pt-[150px] pb-4 gradient-bg-right"}>
                <div className={"flex-center items-end w-full"}>
                    <div className={"flex-col-center items-center"}>
                        <div>
                            <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                            <h1 className={"text-3xl sm:text-4xl md:text-4xl tblack3"}>{title}</h1>
                        </div>
                        <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 tgrayd3 text-2sm sm:text-lg md:text-lg"}>{subtitle}</h2>
                        <p className={"max-w-72 text-sm mt-6 mb-10 tgrayd3 text-center text-2sm md:text-xs"}>{description}</p>
                        <div className={"flex-center gap-x-8 mt-2"}>
                            <div className={"flex-center"}>
                                <p className={"font-medium tblack2 text-3xl md:text-4xl"}>5</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3"}>
                                    <p className={"tblack1 font-medium"}>Years of</p>
                                    <p className={"tblack1 font-medium"}>experience</p>
                                </div>
                            </div>
                            <div className={"flex-center"}>
                                <p className={"font-medium tblack2 text-3xl md:text-4xl"}>10</p>
                                <p className={"font-semibold tprimary ml-1 text-xl md:text-2xl"}>+</p>
                                <div className={"ml-3"}>
                                    <p className={"tblack2 font-medium"}>Successful</p>
                                    <p className={"tblack2 font-medium"}>projects</p>
                                </div>
                            </div>
                        </div>
                        <div className={"flex gap-3 mt-12"}>
                            <button className={"lg:ml-0 btn w-44"}>Download my CV</button>
                            <button className={"lg:ml-0 border tprimary rounded leading-none px-6 py-2 cursor-pointer mx-2 hover:bprimary hover:twhite1 transition uppercase text-xs font-bold"}>Check out my work</button>
                        </div>
                    </div>
                </div>
                <div className={"bg-[url('assets/pictures/picture-me.png')] bg-left-top flex justify-between w-9/12 rounded-xl aspect-[1/1] mx-auto mt-10"} style={{backgroundPosition: "2% 4%", backgroundSize: "270%"}}/>
                <div className={"border-bottom-big w-9/12 mx-auto mt-1.5 rounded"}/>
            </div>
        )
    }

    return (
        windowWidth > 768 ? <CardDesktop/> : <CardMobile/>
    )
}