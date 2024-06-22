import "../../css/constants.css"
import {useEffect, useState} from "react";

const CardDesktop = () => {
    return (
        <div className={"flex-center h-svh bg-gradient-to-bl from-zinc-100 to-zinc-200"}>
            <div className={"bg-[url('assets/pictures/picture-me.png')] bg-cover bg-center flex justify-between w-9/12 aspect-video rounded-xl shadow-black drop-shadow-2xl"}>
                <div className={"flex-col-center items-end w-full"}>
                    <div className={"flex-col-center items-center sm:mr-14 mr-16 md:mr-12 lg:mr-20 xl:mr-24 2xl:mr-32"}>
                        <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>FORSTER Frédéric</h1>
                        <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>Software & Web Engineer</h2>
                        <p className={"sm:max-w-60 md:max-w-72 lg:max-w-xs xl:max-w-sm mt-14 text-neutral-500 text-center text-2sm sm:text-xs md:text-xs lg:text-sm xl:text-base"}>As technology evolves, I remain committed to continuous learning and staying updated with the latest industry trends. This dedication empowers me to leverage cutting-edge tools and techniques, ensuring that my solutions are not only current but also future-proof.</p>
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
                    <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>FORSTER Frédéric</h1>
                    <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>Software & Web Engineer</h2>
                    <p className={"max-w-72 text-sm mt-6 mb-10 text-neutral-500 text-center text-2sm sm:text-xs md:text-xs lg:text-sm xl:text-base"}>As technology evolves, I remain committed to continuous learning and staying updated with the latest industry trends. This dedication empowers me to leverage cutting-edge tools and techniques, ensuring that my solutions are not only current but also future-proof.</p>
                </div>
            </div>
            <div className={"bg-[url('assets/pictures/picture-me.png')] bg-left-top flex justify-between w-9/12 rounded-b-xl aspect-[1/1] mx-auto"} style={{backgroundPosition: "2% 4%", backgroundSize: "270%"}}>

            </div>
        </div>
    )
}

export default function DevelopmentCard() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }, []);

    return (
        <div>
            {windowWidth > 768 ? <CardDesktop/> : <CardMobile/>}
            {/*<div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">*/}
            {/*    <p className="text-center text-xs">I am on an XS screen</p>*/}
            {/*</div>*/}
            {/*<div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">*/}
            {/*    <p className="text-center text-sm">I am on an SM screen</p>*/}
            {/*</div>*/}
            {/*<div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">*/}
            {/*    <p className="text-center text-base">I am on an MD screen</p>*/}
            {/*</div>*/}
            {/*<div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">*/}
            {/*    <p className="text-center text-lg">I am on an LG screen</p>*/}
            {/*</div>*/}
            {/*<div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">*/}
            {/*    <p className="text-center text-xl">I am on an XL screen</p>*/}
            {/*</div>*/}
            {/*<div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">*/}
            {/*    <p className="text-center text-2xl">I am on a 2XL screen</p>*/}
            {/*</div>*/}
        </div>
    );
};