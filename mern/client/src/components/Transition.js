import React from 'react';
import './../css/constants.css';
import { motion } from "framer-motion";

export default function Transition() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
        >
            <div className={"h-lvh flex-center"}>
                <motion.img
                    className="h-52 w-auto"
                    src="/logo.png"
                    alt="Your Company"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
                />
            </div>
        </motion.div>
    );
}