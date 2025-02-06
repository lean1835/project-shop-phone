import React, { useEffect, useRef, useState } from "react";
import { searchSuppliersByName } from "../../services/suppliersService";
import { Link } from "react-router-dom";

function SuppliersStock() {
    const [suppliersList, setSuppliersList] = useState([]);
    const [originSuppliers, setOriginSuppliers] = useState([]);
    const searchName = useRef('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let name = searchName.current.value;
                const list = await searchSuppliersByName(name);
                setSuppliersList(list);
                setOriginSuppliers(list);
            } catch (error) {
                // Handle error here if needed
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originSuppliers.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setSuppliersList(filteredProducts);
    };

    const handelSelectSupplier = () =>{
        
    }
    return (
        <div style={{ border: "2px solid #007bff", borderRadius: "8px", padding: "20px", maxWidth: "1000px", margin: "20px auto", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <h4 style={{ textAlign: "center", color: "#007bff" }}>Tìm nhà cung cấp</h4>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <input ref={searchName} placeholder="Enter name product" className="form-control d-inline-block w-50" />
                <button type="button" onClick={handleSearch} className="btn btn-primary" style={{ marginLeft: "10px" }}>Search</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliersList && suppliersList.map((e, i) => (
                        <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.address}</td>          
                            <td>{e.phone}</td>
                            <td>{e.email}</td>
                            <td>
                                <Link onClick={handelSelectSupplier} to={"/ImportStock"} className="btn btn-info">Select</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SuppliersStock;