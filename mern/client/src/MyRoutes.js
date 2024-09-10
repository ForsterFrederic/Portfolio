import {Route, Routes} from "react-router-dom";
import Private from "./pages/General/Private";
import Projects from "./pages/Projects/Projects";
import Development from "./pages/General/Development";
import Home from "./pages/General/Home";

export function MyRoutes() {
    return (
        process.env.REACT_APP_IS_DEVELOPMENT === "TRUE" ?
            <Routes>
                <Route path="/private" element={<Private/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<Development/>}/>
            </Routes>
            :
            <Routes>
                <Route path="/private" element={<Private/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/development" element={<Development/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
    )
}

export default MyRoutes;
