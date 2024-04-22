import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from "./components/wrapper/Wrapper";

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Wrapper/>}/>
                    {/*<Route path="/trade" element={<Navigate to="/trade"/>}/>*/}
                    {/*<Route path="/dao" element={<Navigate to="/dao"/>}/>*/}
                    {/*<Route path="/more" element={<Navigate to="/more"/>}/>*/}
                    {/*<Route path="/bridges" element={<Navigate to="/bridges"/>}/>*/}
                    {/*<Route path="/portfolio" element={<Navigate to="/portfolio"/>}/>*/}
                    {/*<Route path="/buy-cripto" element={<Navigate to="/buy-cripto"/>}/>*/}
                    {/*<Route path="/card" element={<Navigate to="/card"/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
