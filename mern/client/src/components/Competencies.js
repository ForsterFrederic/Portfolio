import React, { useState } from 'react';

export default function Competencies() {
    const [expand, setExpand] = useState(false);
    const items = [
        "C", "C++", "ReactJs", "NodeJs", ".Net", "Competency 3", "Competency 4",
        "Competency 5", "Competency 6", "Competency 7", "Competency 8",
        "Competency 9", "Competency 10", "Competency 11", "Competency 12",
        "Competency 13", "Competency 14", "Competency 15", "Competency 16",
        "Competency 17", "Competency 18", "Competency 19", "Competency 20"
    ];

    return (
        <div>
            <div className={`grid items-center gap-2 bwhite3 overflow-hidden transition-all duration-300 ${expand ? 'grid-flow-row auto-rows-max grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8' : 'grid-flow-col auto-cols-max'}`}>
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-32 h-32 mx-auto transition-transform transform hover:scale-105 tgrayl3 hover:tblue">
                        <div className="w-14 h-14 bgrayd2 mb-1.5 rounded"></div>
                        <p className="text-center text-sm">{item}</p>
                    </div>
                ))}
            </div>
            <div className={"w-full flex-center relative top--2"}>
                <button onClick={() => setExpand(!expand)} className={"btn"}>
                    {expand ? 'Collapse' : 'Expand'}
                </button>
            </div>
        </div>
    );
};

