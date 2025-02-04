
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import LoginComponent from './components/LoginComponent/LoginComponent';
import HeaderComponent from './components/HomeComponent/HeaderComponent';
import { ToastContainer } from 'react-toastify';
import Manager from './components/BusinessComponent/Manager';
import ManagerRetail from './components/BusinessComponent/ManagerRetail';
import ManagerCustomer from './components/BusinessComponent/ManagerCustomer';
import EditCustomer from './components/BusinessComponent/EditCustomer';
import ChoiceProduct from './components/BusinessComponent/ChoiceProduct';
function App() {
    return (
        <>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<LoginComponent/>} />
                <Route path="/home" element={<HeaderComponent />} />
                <Route  path='/home/manager' element={<Manager/>}/>
                <Route  path='/home/manager/retail' element={<ManagerRetail/>}/>
                <Route  path='/home/manager/retail/product' element={<ChoiceProduct/>}/>
                <Route  path='/home/manager/customer' element={<ManagerCustomer/>}/>
                <Route  path='/home/manager/customer/edit' element={<EditCustomer/>}/>
                
            </Routes>
        </>

    );
}
export default App;
