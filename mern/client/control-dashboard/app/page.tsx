"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Input} from "@nextui-org/react";

export default function Default() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const IS_PROD = process.env.NEXT_PUBLIC_IS_PROD || true;
    const router = useRouter();

    useEffect(() => {
        if (isRunningAsPWA())
            router.push('/home');
    }, [router]);

    function isRunningAsPWA(): boolean {
        if (typeof window !== "undefined") {
            const isStandalone =
                window.matchMedia("(display-mode: standalone)").matches ||
                (typeof window.navigator !== "undefined" && (window.navigator as any).standalone); // Avoid TypeScript errors

            return Boolean(isStandalone);
        }
        return false;
    }

    const handleSignIn = () => {
        if (username === "frederic" && password === "Frederic137*") {
            router.push(`${IS_PROD === "TRUE" ? "/private" : ""}/home`);
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="flex flex-col max-w-2xl px-6 mx-auto min-w-screen justify-center my-[5rem]">
            <p className={"mx-auto text-2xl text-center"}>Frédéric Forster's Portofolio control dashboard</p>
            <span className="mt-1 text-sm mx-auto text-gray-500">Please sign in to access the dashboard</span>
            <label className={"text-sm mt-10 mb-1"} htmlFor={"username"}>Username</label>
            <Input onChange={(e) => {setUsername(e.target.value)}} className={"text-sm border-gray-300 mb-2 w-full rounded-lg border"} type={"text"} placeholder={"Username"}/>
            <label className={"text-sm mt-5 mb-1"} htmlFor={"password"}>Password</label>
            <Input onChange={(e) => {setPassword(e.target.value)}} className={"text-sm border-gray-300 mb-2 w-full rounded-lg border"} type={"password"} placeholder={"Password"}/>
            <Button onClick={handleSignIn} className={"mt-8 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"}>Sign in</Button>
        </div>
    );
}