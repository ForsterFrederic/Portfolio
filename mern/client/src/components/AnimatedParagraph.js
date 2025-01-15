import React, { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function AnimatedParagraph({ value }) {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.70", "start 0.35"],
    });

    const words = React.Children.toArray(value.flatMap((item) =>
        typeof item === "string" ? item.split(" ") : item
    ));

    return (
        <div
            className={
                "flex flex-wrap md:text-lg lg:text-lg xl:text-xl font-medium tgrayd2 max-w-3xl mx-auto lg:mx-0 lg:max-w-full text-center lg:text-justify"
            }
            ref={element}
        >
            {words.map((word, i) => {
                if (word?.type === "br") {
                    return (
                        <div
                            key={`br-${i}`}
                            className="w-full my-1 lg:my-2"
                        />
                    );
                }

                const start = i / words.length;
                const end = start + 1 / words.length;

                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

const Word = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className={"mr-[7px] mt-[2px] relative"}>
            <span className={"opacity-30 absolute"}>{children}</span>
            <motion.span style={{ opacity }}>
                {children}
            </motion.span>
        </span>
    );
};