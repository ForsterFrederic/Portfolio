"use client";

import { ReactNode } from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import "../globals.css"

const variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    enter: {
        opacity: 1,
        y: 0,
    },
    exit: {

    },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <DashboardSideBar />
            <DashboardTopNav>
                <AnimatePresence mode="wait">
                    <motion.main
                        key={pathname}
                        className="customhidden flex flex-col gap-4 p-4 lg:gap-6"
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        onAnimationStart={() => {
                            document.querySelector('.customhidden')?.classList.remove('customhidden');
                        }}
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </DashboardTopNav>
        </div>
    );
}