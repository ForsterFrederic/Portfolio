import "../../css/constants.css"
import {useEffect, useState} from "react";

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [title, setTitle] = useState("FORSTER Frédéric")
    const [subtitle, setSubtitle] = useState("FORSTER Frédéric")
    const [description, setDescription] = useState("As technology evolves, I remain committed to continuous learning and staying updated with the latest industry trends. This dedication empowers me to leverage cutting-edge tools and techniques, ensuring that my solutions are not only current but also future-proof.")

    const CardDesktop = () => {
        return (
            <div className={"flex-center h-svh bg-gradient-to-bl from-zinc-100 to-zinc-200"}>
                <div className={"bg-[url('assets/pictures/picture-me.png')] bg-cover bg-center flex justify-between w-9/12 aspect-video rounded-xl shadow-black drop-shadow-2xl"}>
                    <div className={"flex-col-center items-end w-full"}>
                        <div className={"flex-col-center items-center sm:mr-14 mr-16 md:mr-12 lg:mr-20 xl:mr-24 2xl:mr-32"}>
                            <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>{title}</h1>
                            <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>{subtitle}</h2>
                            <p className={"sm:max-w-60 md:max-w-72 lg:max-w-xs xl:max-w-sm mt-14 text-neutral-500 text-center text-2sm sm:text-xs md:text-xs lg:text-sm xl:text-base"}>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const CardMobile = () => {
        return (
            <div className={"flex-col-center h-svh bg-gradient-to-bl from-zinc-100 to-zinc-200 rounded-b-xl bg-gray-700"}>
                <div className={"flex-center items-end w-full"}>
                    <div className={"flex-col-center items-center"}>
                        <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>{title}</h1>
                        <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>{subtitle}</h2>
                        <p className={"max-w-72 text-sm mt-6 mb-10 text-neutral-500 text-center text-2sm sm:text-xs md:text-xs lg:text-sm xl:text-base"}>{description}</p>
                    </div>
                </div>
                <div className={"bg-[url('assets/pictures/picture-me.png')] bg-left-top flex justify-between w-9/12 rounded-b-xl aspect-[1/1] mx-auto"} style={{backgroundPosition: "2% 4%", backgroundSize: "270%"}}>

                </div>
            </div>
        )
    }

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    return (
        <div>
            {windowWidth > 768 ? <CardDesktop/> : <CardMobile/>}
        </div>
    );
};