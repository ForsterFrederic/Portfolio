const Test = () => {
    const h1 = "text-center font-extrabold text-2xl mb-5";
    const p = "text-center font-extrabold mt-5";
    const lvlDiv2 = "space-y-3 mb-10 mt-10";
    const lvlDiv3 = "flex gap-3 justify-center";
    const lvlDiv4 = "h-40 w-40 flex items-center justify-center border-2 border-black text-lg text-fuchsia-700";

    return (
        <div className="grid">
            <p className={"mx-auto mb-3 mt-20"}>_______________________________________</p>
            <p className={"mx-auto text-4xl font-bold"}>COLOR PALETTE 1</p>
            <p className={"mx-auto mb-3"}>_______________________________________</p>

            <div className={lvlDiv2}>
                <h1 className={h1}>PRIMARY</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-primary-light`}>
                        primary-light
                    </div>
                    <div className={`${lvlDiv4} bg-blue-600`}>
                        blue-600
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-primary-dark`}>
                        primary-dark
                    </div>
                    <div className={`${lvlDiv4} bg-amber-500`}>
                        amber-500
                    </div>
                </div>
                <p className={p}>hover</p>
                <div className={`${lvlDiv3} flex-col`}>
                    <div className={`${lvlDiv4} bg-blue-700 mx-auto`}>
                        blue-700
                    </div>
                    <div className={`${lvlDiv4} bg-amber-600 mx-auto`}>
                        amber-600
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>SECONDARY</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-secondary-light`}>
                        secondary-light
                    </div>
                    <div className={`${lvlDiv4} bg-zinc-100`}>
                        zinc-100
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-secondary-dark`}>
                        secondary-dark
                    </div>
                    <div className={`${lvlDiv4} bg-neutral-900`}>
                        neutral-900
                    </div>
                </div>
                <p className={p}>hover</p>
                <div className="space-y-3">
                    <div className={`${lvlDiv4} bg-zinc-200 mx-auto`}>
                        zinc-200
                    </div>
                    <div className={`${lvlDiv4} bg-neutral-800 mx-auto`}>
                        neutral-800
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>TERTIARY</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-tertiary-light`}>
                        tertiary-light
                    </div>
                    <div className={`${lvlDiv4} bg-stone-200`}>
                        stone-200
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-tertiary-dark`}>
                        tertiary-dark
                    </div>
                    <div className={`${lvlDiv4} bg-neutral-300`}>
                        neutral-300
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>FOURTHIARY</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-fourthiary-light`}>
                        fourthiary-light
                    </div>
                    <div className={`${lvlDiv4} bg-gray-800`}>
                        gray-800
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-fourthiary-dark`}>
                        fourthiary-dark
                    </div>
                    <div className={`${lvlDiv4} bg-zinc-300`}>
                        zinc-300
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>FIFTHIARY</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-fifthiary-light`}>
                        fifthiary-light
                    </div>
                    <div className={`${lvlDiv4} bg-gray-900`}>
                        gray-900
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-fifthiary-dark`}>
                        fifthiary-dark
                    </div>
                    <div className={`${lvlDiv4} bg-neutral-50`}>
                        neutral-50
                    </div>
                </div>
            </div>

            <div className={`${lvlDiv2} mx-auto`}>
                <h1 className={h1}>SUCCESS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-success`}>
                        success
                    </div>
                    <div className={`${lvlDiv4} bg-emerald-500`}>
                        emerald-500
                    </div>
                </div>
            </div>

            <div className={`${lvlDiv2} mx-auto`}>
                <h1 className={h1}>WARNING</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-warning`}>
                        warning
                    </div>
                    <div className={`${lvlDiv4} bg-orange-500`}>
                        orange-500
                    </div>
                </div>
            </div>

            <div className={`${lvlDiv2} mx-auto`}>
                <h1 className={h1}>DANGER</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-danger`}>
                        danger
                    </div>
                    <div className={`${lvlDiv4} bg-red-500`}>
                        red-500
                    </div>
                </div>
            </div>
        </div>
    );
};

const Test2 = () => {
    const h1 = "text-center font-extrabold text-2xl";
    const p = "text-center font-extrabold";
    const lvlDiv2 = "space-y-3 mb-10 mt-10";
    const lvlDiv3 = "flex gap-3";
    const lvlDiv4 = "h-40 w-40 flex items-center justify-center border-2 border-black text-lg";

    const colorPalette = {
        blue600: "bg-blue-600 text-white",
        amber500: "bg-amber-500 text-black",
        blue700: "bg-blue-700 text-white",
        amber600: "bg-amber-600 text-black",
        zinc100: "bg-zinc-100 text-black",
        neutral900: "bg-neutral-900 text-white",
        zinc200: "bg-zinc-200 text-black",
        neutral800: "bg-neutral-800 text-white",
        stone200: "bg-stone-200 text-black",
        neutral300: "bg-neutral-300 text-black",
        gray800: "bg-gray-800 text-white",
        zinc300: "bg-zinc-300 text-black",
        gray900: "bg-gray-900 text-white",
        neutral50: "bg-neutral-50 text-black",
        success: "bg-success text-black",
        emerald500: "bg-emerald-500 text-black",
        warning: "bg-warning text-black",
        orange500: "bg-yellow-600 text-black",
        danger: "bg-danger text-black",
        red500: "bg-red-500 text-black"
    };

    return (
        <div className="grid">

            <p className={"mx-auto mb-3 mt-20"}>_______________________________________</p>
            <p className={"mx-auto text-4xl font-bold"}>COLOR PALETTE 2</p>
            <p className={"mx-auto mb-3"}>_______________________________________</p>


            <div className={lvlDiv2}>
                <h1 className={h1}>COLOR PALETTE</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-primary-light text-black`}>
                        primary-light
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.blue600}`}>
                        blue-600
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} bg-primary-dark text-white`}>
                        primary-dark
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.amber500}`}>
                        amber-500
                    </div>
                </div>
                <p className={p}>hover</p>
                <div className={`${lvlDiv3} flex-col`}>
                    <div className={`${lvlDiv4} ${colorPalette.blue700} mx-auto`}>
                        blue-700
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.amber600} mx-auto`}>
                        amber-600
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>OTHER COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.zinc100}`}>
                        zinc-100
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral900}`}>
                        neutral-900
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.zinc200}`}>
                        zinc-200
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral800}`}>
                        neutral-800
                    </div>
                </div>
                <p className={p}>hover</p>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.stone200} mx-auto`}>
                        stone-200
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral300} mx-auto`}>
                        neutral-300
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>ADDITIONAL COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.gray800}`}>
                        gray-800
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.zinc300}`}>
                        zinc-300
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.gray900}`}>
                        gray-900
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral50}`}>
                        neutral-50
                    </div>
                </div>
            </div>

            <div className={`${lvlDiv2} mx-auto`}>
                <h1 className={h1}>STATUS COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.success}`}>
                        success
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.emerald500}`}>
                        emerald-500
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.warning}`}>
                        warning
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.orange500}`}>
                        orange-500
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.danger}`}>
                        danger
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.red500}`}>
                        red-500
                    </div>
                </div>
            </div>

        </div>
    );
}

const Test3 = () => {
    const h1 = "text-center font-extrabold text-2xl mb-5";
    const p = "text-center font-extrabold mt-5";
    const lvlDiv2 = "space-y-3 mb-10 mt-10";
    const lvlDiv3 = "flex gap-3 justify-center";
    const lvlDiv4 = "h-40 w-40 flex items-center justify-center border-2 border-black text-lg";

    const colorPalette = {
        blue600: "bg-blue-600 text-white",
        amber500: "bg-amber-500 text-black",
        indigo300: "bg-green-400 text-white text-black",
        purple600: "bg-purple-600 text-white",
        zinc100: "bg-zinc-100 text-black",
        neutral900: "bg-neutral-900 text-white",
        zinc200: "bg-zinc-200 text-black",
        neutral800: "bg-neutral-800 text-white",
        stone200: "bg-stone-200 text-black",
        neutral300: "bg-neutral-300 text-black",
        gray800: "bg-gray-800 text-white",
        zinc300: "bg-zinc-300 text-black",
        gray900: "bg-gray-900 text-white",
        neutral50: "bg-neutral-50 text-black",
        success: "bg-emerald-500 text-black",
        warning: "bg-orange-400 text-black",
        danger: "bg-red-400 text-black"
    };

    return (
        <div className="grid">

            <p className={"mx-auto mb-3 mt-20"}>_______________________________________</p>
            <p className={"mx-auto text-4xl font-bold"}>COLOR PALETTE</p>
            <p className={"mx-auto mb-3"}>_______________________________________</p>


            <div className={lvlDiv2}>
                <h1 className={h1}>PRIMARY COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.blue600}`}>
                        blue-600
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.amber500}`}>
                        amber-500
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.indigo300}`}>
                        primary-light
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.purple600}`}>
                        primary-dark
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>NEUTRAL & GRAY TONES</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.zinc100}`}>
                        zinc-100
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral900}`}>
                        neutral-900
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.zinc200}`}>
                        zinc-200
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral800}`}>
                        neutral-800
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.stone200}`}>
                        stone-200
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral300}`}>
                        neutral-300
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.gray800}`}>
                        gray-800
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.zinc300}`}>
                        zinc-300
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.gray900}`}>
                        gray-900
                    </div>
                    <div className={`${lvlDiv4} ${colorPalette.neutral50}`}>
                        neutral-50
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>STATUS COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.success}`}>
                        emerald-500
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.warning}`}>
                        orange-400
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} ${colorPalette.danger}`}>
                        red-400
                    </div>
                </div>
            </div>

        </div>
    );
}

export default function Colors() {
    return (
        <div>
            {/*<Test/>*/}
            {/*<Test2/>*/}
            <Test3/>
        </div>
    );
};