import React, {useEffect, useState} from "react";
import {getAllCustomers} from "../../services/customerService";
import {useLocation, useNavigate} from "react-router-dom";
import {formarCurrency, getUriSearchParam} from "../../utils/common";
import '../../assets/saleComp.css';

function SaleManager() {
    const location = useLocation();
    let params = {};
    if (location.search) {
        params = getUriSearchParam(location.search);
    }
    const [phone, setPhone] = useState(location.state?.phone || params.phone || "");
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    const [allSelectedProduct] = useState({
        selectedProduct: location.state?.selectedProducts || [],
        total: location.state?.total || 0
    });

    const handleCheck = async () => {
        let customers = await getAllCustomers();
        let customer = customers.find(c => c.phone === phone);
        if (customer) {
            setCustomer(customer);
            const newParams = new URLSearchParams();
            newParams.set("phone", customer.phone);
            navigate(`?${newParams.toString()}`);
        } else {
            navigate('/addNewCustomer', {state: {phone: phone}});
        }
    }

    useEffect(() => {
        if (phone) {
            getAllCustomers().then(customers => {
                let customer = customers.find(c => c.phone === phone);
                if (customer) {
                    setCustomer(customer);
                    const newParams = new URLSearchParams();
                    newParams.set("phone", customer.phone);
                    navigate(`?${newParams.toString()}`);
                }
            });
        }
    }, [navigate, phone]);

    return (
        <div className="container">
            <h1>Sale Manager</h1>
            <div className="order-box order-box-1">
                <div>
                    <label>Phone:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <button onClick={handleCheck}>Check</button>
                </div>
                {customer && (
                    <table className="sales-table">
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Name</th>
                            <td className="render-td">{customer.name}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Phone</th>
                            <td className="render-td">{customer.phone}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Address</th>
                            <td className="render-td">{customer.address}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Age</th>
                            <td className="render-td">{customer.age}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr className="render-tr">
                            <th className="render-th">Email</th>
                            <td className="render-td">{customer.email}</td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className="order-box order-box-2">
                <button onClick={() => navigate('/searchProduct', {state: {phone: phone}})}>Select Product</button>
                <table className="sales-table">
                    <tbody>
                    <tr className="render-tr">
                        <th className="render-th">Selected Product</th>
                        <td className="render-td">{allSelectedProduct.selectedProduct}</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr className="render-tr">
                        <th className="render-th">Total</th>
                        <td className="render-td">{formarCurrency(allSelectedProduct.total)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SaleManager;