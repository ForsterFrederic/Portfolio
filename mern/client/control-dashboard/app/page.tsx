"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Default() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isRunningAsPWA())
            router.push('/home');
    }, [router]);

    function isRunningAsPWA() {
        if (typeof window !== 'undefined') {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                (typeof window.navigator !== 'undefined' && window.navigator.standalone);

            return Boolean(isStandalone);
        }
        return false;
    }

    const handleSignIn = () => {
        if (username === "frederic" && password === "Frederic137*") {
            router.push('/home');
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="flex flex-col max-w-2xl px-6 mx-auto min-w-screen justify-center my-[5rem]">
            <p className={"mx-auto text-2xl text-center"}>Frédéric Forster's Portofolio control dashboard</p>
            <span className="mt-1 text-sm mx-auto text-gray-500">Please sign in to access the dashboard</span>
            <label className={"text-sm mt-10 mb-1"} htmlFor={"username"}>Username</label>
            <input onChange={(e) => {setUsername(e.target.value)}} className={"p-2.5"} type={"text"} placeholder={"Username"}/>
            <label className={"text-sm mt-5 mb-1"} htmlFor={"password"}>Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} className={"p-2.5"} type={"password"} placeholder={"Password"}/>
            <button onClick={handleSignIn} className={"mt-8 rounded"}>Sign in</button>
        </div>
    );
}