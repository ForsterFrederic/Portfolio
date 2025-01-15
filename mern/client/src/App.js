import MyRoutes from "./MyRoutes";
import {BrowserRouter} from "react-router-dom";
import './css/constants.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AnimatePresence} from "framer-motion";
import WindowDimensionsProvider from "./contexts/WindowDimensionsContext";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function App() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 9),
            direction: "vertical",
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <AnimatePresence mode={"wait"}>
            <BrowserRouter>
                <WindowDimensionsProvider>
                    <MyRoutes/>
                    <ToastContainer />
                </WindowDimensionsProvider>
            </BrowserRouter>
        </AnimatePresence>
    );
}

export default App;