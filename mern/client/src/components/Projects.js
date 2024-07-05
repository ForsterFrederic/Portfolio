import TestImage from "./../assets/pictures/test.jpg"

export default function Projects() {
    return (
        <div className={"py-10"}>
            <div className={"ml-40 w-max mb-10"}>
                <div className={"bprimary w-4/12 h-1.5 rounded mb-3"}/>
                <p className={"text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3"}>My Projects</p>
            </div>
            <div className={""}>
                <div className={"grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-14 md:mx-32"}>
                    <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3"}>
                        <div className={"aspect-[16/9] mx-auto border-bottom-medium"}>
                            <img className={"aspect-[16/9] rounded-t bg-cover grayscale hover:"} src={TestImage}/>
                        </div>
                        <div className={"flex-col-center w-full p-3 shadow-xl"}>
                            <p className={"font-semibold text-lg mb-2 mx-auto"}>Wollenschneider website</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                        </div>
                    </div>
                    <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3"}>
                        <div className={"aspect-[16/9] mx-auto border-bottom-medium"}>
                            <img className={"aspect-[16/9] rounded-t bg-cover grayscale hover:"} src={TestImage}/>
                        </div>
                        <div className={"flex-col-center w-full p-3 shadow-xl"}>
                            <p className={"font-semibold text-lg mb-2 mx-auto"}>Wollenschneider website</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                        </div>
                    </div>
                    <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3"}>
                        <div className={"aspect-[16/9] mx-auto border-bottom-medium"}>
                            <img className={"aspect-[16/9] rounded-t bg-cover grayscale hover:"} src={TestImage}/>
                        </div>
                        <div className={"flex-col-center w-full p-3 shadow-xl"}>
                            <p className={"font-semibold text-lg mb-2 mx-auto"}>Wollenschneider website</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                        </div>
                    </div>
                    <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3"}>
                        <div className={"aspect-[16/9] mx-auto border-bottom-medium"}>
                            <img className={"aspect-[16/9] rounded-t bg-cover grayscale hover:"} src={TestImage}/>
                        </div>
                        <div className={"flex-col-center w-full p-3 shadow-xl"}>
                            <p className={"font-semibold text-lg mb-2 mx-auto"}>Wollenschneider website</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                        </div>
                    </div>
                    <div className={"cursor-pointer hover:scale-105 rounded shadow hover:shadow-xl max-w-xl transition bwhite3"}>
                        <div className={"aspect-[16/9] mx-auto border-bottom-medium"}>
                            <img className={"aspect-[16/9] rounded-t bg-cover grayscale hover:"} src={TestImage}/>
                        </div>
                        <div className={"flex-col-center w-full p-3 shadow-xl"}>
                            <p className={"font-semibold text-lg mb-2 mx-auto"}>Wollenschneider website</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                            <p className={"tgrayd3"}>TEXT here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
