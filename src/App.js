import "./App.css";
import ListStock from "./components/StockComponent/ListStock";
import {Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import AddStock from "./components/StockComponent/AddStock";
import ProductsInStock from "./components/StockComponent/ProductsInStock";
import SuppliersStock from "./components/StockComponent/SuppliersStock";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/ListStock"} element={<ListStock />}></Route>
        <Route path={"/ImportStock"} element={<AddStock />}></Route>
        <Route path={"/ProductsInStock"} element={<ProductsInStock/>}></Route>
        <Route path={"/SuppliersStock"} element={<SuppliersStock/>}></Route>
      </Routes>
    </>
    
  );
}
export default App;
