import React, {useState} from "react";
import {getAllCustomers} from "../../services/customerService";
import {useLocation, useNavigate} from "react-router-dom";

function SaleManager() {
    const location = useLocation();
    const [phone, setPhone] = useState(location.state?.phone || "");
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();

    const handleCheck = async () => {
        const customers = await getAllCustomers();
        const foundCustomer = customers.find(c => c.phone === phone);
        if (foundCustomer) {
            setCustomer(foundCustomer);
        } else {
            navigate('/addNewCustomer', {state: {phone}});
        }
    };

    return (
        <>
            <div>
                <label>Phone:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <button onClick={handleCheck}>Check</button>
            </div>
            {customer && (
                <div>
                    <p>Name: {customer.name}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Address: {customer.address}</p>
                    <p>Age: {customer.age}</p>
                    <p>Email: {customer.email}</p>
                </div>
            )}
        </>
    );
}

export default SaleManager;