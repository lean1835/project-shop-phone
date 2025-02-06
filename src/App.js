import React from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import LoginComponent from './components/LoginComponent/LoginComponent';
import { ToastContainer } from 'react-toastify';
import Manager from './components/BusinessComponent/Manager';
import ManagerRetail from './components/BusinessComponent/ManagerRetail';
import ManagerCustomer from './components/BusinessComponent/ManagerCustomer';
import ChoiceProduct from './components/BusinessComponent/ChoiceProduct';
import HomeComponent from './components/HomeComponent/HomeComponent';
import EditManagerCustomer from './components/BusinessComponent/EditManagerCustomer';
import SaleManager from './components/SalesComponent/SaleManager';
import AddNewCustomer from "./components/SalesComponent/AddNewCustomer";
import SearchProduct from "./components/SalesComponent/SearchProduct";
import StaffingComponent from './components/StaffingComponent';

function App() {
    return (
        <>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<LoginComponent/>} />
                <Route path="/home" element={<HomeComponent />} />
                <Route  path='/home/manager' element={<Manager/>}/>
                <Route  path='/home/manager/retail' element={<ManagerRetail/>}/>
                <Route  path='/home/manager/retail/product' element={<ChoiceProduct/>}/>
                <Route  path='/home/manager/customer' element={<ManagerCustomer/>}/>
                <Route  path='/home/manager/customer/edit' element={<EditManagerCustomer/>}/>
                <Route path="/saleManager" element={<SaleManager/>}/>
                <Route path="/addNewCustomer" element={<AddNewCustomer/>}/>
                <Route path='/searchProduct' element={<SearchProduct/>}/>
                <Route path='/home/managerStaff' element={<StaffingComponent />} />
            </Routes>
        </>

    );
}
export default App;
