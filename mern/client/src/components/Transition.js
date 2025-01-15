import React from 'react';
import './../css/constants.css';
import { motion } from "framer-motion";

export default function Transition() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className={"h-lvh flex-center"}>
                <motion.img
                    className="w-4/12"
                    src="/logo2.webp"
                    alt="Your Company"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                />
            </div>
        </motion.div>
    );
}