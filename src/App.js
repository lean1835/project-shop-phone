
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import LoginComponent from './components/LoginComponent/LoginComponent';
import { ToastContainer } from 'react-toastify';
import HomeComponent from './components/HomeComponent/HomeComponent';
function App() {
    return (
        <>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<LoginComponent/>} />
                <Route path="/home" element={<HomeComponent />} />
            </Routes>
        </>

    );
}
export default App;
