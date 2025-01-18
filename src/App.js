import React from 'react';
import './App.css';
import SaleManager from './components/SalesComponent/SaleManager';
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import AddNewCustomer from "./components/SalesComponent/AddNewCustomer";

function App() {
    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/SaleManager" element={<SaleManager/>}/>
                <Route path="/addNewCustomer" element={<AddNewCustomer/>}/>
            </Routes>
        </>
    );
}
export default App;
