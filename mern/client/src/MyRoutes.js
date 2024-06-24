import {Route, Routes} from "react-router-dom";
import Developpment from "./pages/General/Developpment";
import Projects from "./pages/Projects/Projects";
import Colors from "./pages/General/Colors";
import DevelopmentCard from "./pages/General/DeveloppmentCard";
import Home from "./pages/General/Home";

export function MyRoutes() {
    return (
        <Routes>
            <Route path="/private" element={<Developpment/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/colors" element={<Colors/>}/>
            <Route path="/" element={<DevelopmentCard/>}/>
            <Route path="/home" element={<Home/>}/>
            {/*<Route path="/login" element={<Login/>}/>*/}
            {/*<Route path="/register" element={<InDevelopment/>}/>*/}
            {/*<Route path="/reset-password" element={<InDevelopment/>}/>*/}
            {/*<Route path="/" element={<Main/>}>*/}
            {/*    <Route path="/" element={<News/>}/>*/}
            {/*    <Route path="/calendar" element={<Calendar/>}/>*/}
            {/*    <Route path="/documents" element={<Documents/>}/>*/}
            {/*    <Route path="/media" element={<Projects/>}/>*/}
            {/*    <Route path="/media-viewer" element={<MediaViewer/>}/>*/}
            {/*    <Route path="/history" element={<History/>}/>*/}
            {/*    <Route path="/contact" element={<Contacts/>}/>*/}
            {/*    <Route path="/manage" element={<Manage/>}/>*/}
            {/*    <Route path="/counter" element={<Counter/>}/>*/}
            {/*    <Route path="/profile" element={<Profile/>}/>*/}
            {/*    <Route path="*" element={<NotFound/>}/>*/}
            {/*</Route>*/}
            {/*<Route path="/auth/email/verify/*" element={<InDevelopment/>}/>*/}
            {/*<Route path="/in-development" element={<InDevelopment/>}/>*/}
        </Routes>
    );
}

export default MyRoutes;
