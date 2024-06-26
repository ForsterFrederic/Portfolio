import "../../css/constants.css"

export default function Contact() {
    return (
        <div className={"bg-gray-200 mr-44 mt-28 mb-28"}>
            <div>
                <div className={"bg-blue-600 w-4/12 h-1.5 rounded mb-3"}/>
                <p className={"pl-32 text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-800"}>Let's work together</p>
            </div>
            <div className={"ml-auto w-6/12"}>
                <div className={"bg-gradient-to-bl from-white to-zinc-300 flex justify-between rounded-xl shadow-black drop-shadow-2xl"}>
                    <div className={"flex-col-center items-end"}>
                        <div className={"flex-col-center items-center sm:mr-14 mr-16 md:mr-12 lg:mr-20 xl:mr-24 2xl:mr-32"}>
                            <div>
                                <div className={"bg-blue-600 w-4/12 h-1.5 rounded mb-3"}/>
                                <h1 className={"text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800"}>title</h1>
                            </div>
                            <h2 className={"font-light mt-0.5 md:mt-1 lg:mt-2 text-neutral-500 text-2sm md:text-lg lg:text-2xl xl:text-3xl"}>subtitle</h2>
                            <p className={"w-7/12 text-center mt-7 text-neutral-500 "}>As technology, I remain committed to continuous learning and staying updated with the latest industry trends.</p>
                            <div className={"flex-center gap-x-14 mt-16"}>
                                <div className={"flex-center"}>
                                    <p className={"text-5xl font-medium text-gray-800"}>5</p>
                                    <p className={"font-semibold text-blue-600 text-3xl ml-1"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"text-gray-800 font-medium"}>Years of</p>
                                        <p className={"text-gray-800 font-medium"}>experience</p>
                                    </div>
                                </div>
                                <div className={"flex-center"}>
                                    <p className={"text-5xl font-medium text-gray-800"}>10</p>
                                    <p className={"font-semibold text-blue-600 text-3xl ml-1"}>+</p>
                                    <div className={"ml-3"}>
                                        <p className={"text-gray-800 font-medium"}>Successful</p>
                                        <p className={"text-gray-800 font-medium"}>projects</p>
                                    </div>
                                </div>
                            </div>
                            <button className={"btn mt-10 px-20"}>Check out my work</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};