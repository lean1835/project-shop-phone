import { Route, Routes } from "react-router-dom";
import "./App.css";
import StaffingComponent from "./components/StaffingComponent";

function App() {
  return (
    <Routes>
      <Route path='/admin/staff' element={<StaffingComponent />} />
    </Routes>
  );
}
export default App;
