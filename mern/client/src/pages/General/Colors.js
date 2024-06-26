const ColorPalette = () => {
    const h1 = "text-center font-extrabold text-2xl mb-5";
    const lvlDiv2 = "space-y-3 mb-10 mt-10";
    const lvlDiv3 = "flex gap-3 justify-center";
    const lvlDiv4 = "h-40 w-40 flex items-center justify-center border-2 border-black text-lg cursor-pointer";

    return (
        <div className="grid mb-24">

            <p className={"mx-auto mb-3 mt-20"}>_______________________________________</p>
            <p className={"mx-auto text-4xl font-bold"}>COLOR PALETTE</p>
            <p className={"mx-auto mb-3"}>_______________________________________</p>


            <div className={lvlDiv2}>
                <h1 className={h1}>PRIMARY COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbblue`}>
                        blue-600
                    </div>
                    <div className={`${lvlDiv4} tborange`}>
                        yellow-500
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbpink`}>
                        pink-500
                    </div>
                    <div className={`${lvlDiv4} tbpurple`}>
                        purple-600
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>NEUTRAL TONES</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbwhite1`}>
                        white
                    </div>
                    <div className={`${lvlDiv4} tbwhite2`}>
                        neutral-50
                    </div>
                    <div className={`${lvlDiv4} tbwhite3`}>
                        zinc-100
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbgrayl1`}>
                        zinc-200
                    </div>
                    <div className={`${lvlDiv4} tbgrayl2`}>
                        zinc-300
                    </div>
                    <div className={`${lvlDiv4} tbgrayl3`}>
                        zinc-400
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbgrayd1`}>
                        neutral-300
                    </div>
                    <div className={`${lvlDiv4} tbgrayd2`}>
                        stone-300
                    </div>
                    <div className={`${lvlDiv4} tbgrayd3`}>
                        stone-400
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbblack1`}>
                        neutral-800
                    </div>
                    <div className={`${lvlDiv4} tbblack2`}>
                        neutral-900
                    </div>
                    <div className={`${lvlDiv4} tbblack3`}>
                        black
                    </div>
                </div>
            </div>

            <div className={lvlDiv2}>
                <h1 className={h1}>STATUS COLORS</h1>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbsuccess`}>
                        emerald-500
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbwarning`}>
                        orange-400
                    </div>
                </div>
                <div className={lvlDiv3}>
                    <div className={`${lvlDiv4} tbdanger`}>
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
            <ColorPalette/>
        </div>
    );
};
