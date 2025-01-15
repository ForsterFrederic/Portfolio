import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useWindowDimensions } from "../contexts/WindowDimensionsContext";
import Ipad from "../assets/pictures/ipad.webp"

export default function ZoomParallax() {
    const container = useRef(null);
    const windowDimensions = useWindowDimensions();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
    const scale2 = useTransform(scrollYProgress, [0, 1], [1, 3]);
    const scale3 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 8]);

    const pictures = [
        {
            desktop: "/screenshots/project0/base.webp",
            scale: windowDimensions.wWCheck(1200) ? scale1 : scale2,
        },
        {
            desktop: "/screenshots/project2/large-desktop-landscape.webp",
            scale: scale6,
        },
        {
            desktop: "/screenshots/project3/large-desktop-landscape.webp",
            scale: scale3,
        },
        {
            desktop: "/screenshots/project4/large-desktop-landscape.webp",
            scale: scale4,
        },
        {
            desktop: "/screenshots/project5/large-desktop-landscape.webp",
            scale: scale5,
        },
        {
            desktop: "/screenshots/project6/large-desktop-landscape.webp",
            scale: scale6,
        },
    ];

    const getPosition = (index, screenSize) => {
        switch (index) {
            case 0:
                return {top: "0vw", left: "0vw"};
            case 1:
                return {top: "-19.5vw", left: "19vw"};
            case 2:
                return {top: "-10vw", left: "-26.4vw"};
            case 3:
                return {top: "4.5vw", left: "26.7vw"};
            case 4:
                return {top: "24.3vw", left: "8vw"};
            case 5:
                return {top: "20vw", left: "-19vw"};
            default:
                return {top: "0", left: "0"};
        }
    };

    return (
        <div ref={container} className="containerZoomParallax -mt-64 xs-2:-mt-80 md:-mt-60 lg:-mt-64 xl:mt-0">
            <div className="sticky">
                {pictures.map(({ desktop, scale, alt }, index) => (
                    <motion.div
                        key={index}
                        style={{ scale }}
                        className="el"
                    >
                        <div className="imageContainer pt-20" style={getPosition(index, windowDimensions.windowWidth)}>
                            <picture>
                                <div className="iPadMockup shadow-2xl">
                                    <img
                                        src={Ipad}
                                        alt="iPad Mockup"
                                        className="mockupImage"
                                    />
                                    <img
                                        src={
                                           desktop
                                        }
                                        alt={"Un projet mis en avant"}
                                        className="mockupContent aspect-[4/3]"
                                    />
                                </div>
                            </picture>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}