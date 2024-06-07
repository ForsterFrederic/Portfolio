import MyRoutes from "./MyRoutes";
import {BrowserRouter} from "react-router-dom";
import './css/constants.css'

export function App() {
    return (
        <BrowserRouter>
            <MyRoutes/>
        </BrowserRouter>
    );
}

export default App;