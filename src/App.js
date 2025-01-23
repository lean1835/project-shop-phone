
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import LoginComponent from './components/LoginComponent/LoginComponent';
import HeaderComponent from './components/HomeComponent/HeaderComponent';
import { ToastContainer } from 'react-toastify';
function App() {
    return (
        <>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<LoginComponent/>} />
                <Route path="/home" element={<HeaderComponent />} />
            </Routes>
        </>

    );
}
export default App;
