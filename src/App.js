import React from 'react';
import './App.css';
import SaleManager from './components/SalesComponent/SaleManager';
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import AddNewCustomer from "./components/SalesComponent/AddNewCustomer";
import SearchProduct from "./components/SalesComponent/SearchProduct";

function App() {
    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/SaleManager" element={<SaleManager/>}/>
                <Route path="/addNewCustomer" element={<AddNewCustomer/>}/>
                <Route path='/searchProduct' element={<SearchProduct/>}/>
            </Routes>
        </>
    );
}
export default App;
