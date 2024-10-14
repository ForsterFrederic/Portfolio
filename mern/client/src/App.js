import MyRoutes from "./MyRoutes";
import {BrowserRouter} from "react-router-dom";
import './css/constants.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {

    return (
        <BrowserRouter>
            <MyRoutes/>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;