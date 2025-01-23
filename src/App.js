
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Manager from './components/BusinessComponent/Manager';
import { BrowserRouter } from 'react-router-dom';
import ManagerRetail from './components/BusinessComponent/ManagerRetail';
import ChoiceProduct from './components/BusinessComponent/ChoiceProduct';
import ManagerCustomer from './components/BusinessComponent/ManagerCustomer';
import EditCustomer from './components/BusinessComponent/EditCustomer';
function App() {
    return (
        <>

            <Routes>
            <Route path="/" element={<Manager />} />
                <Route path='/retail' element={<ManagerRetail/>}></Route>
                <Route path='/retail/product' element={<ChoiceProduct/>}></Route>
                <Route path='/customer' element={<ManagerCustomer/>}></Route>
                <Route path='/customer/edit' element={<EditCustomer/>}></Route>
            </Routes>
            
        </>
        
        
    );
}
export default App;
