import React, { useEffect, useRef, useState } from "react";
import { searchSuppliersByName } from "../../services/suppliersService";
import {  useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function SuppliersStock() {
    const [suppliersList, setSuppliersList] = useState([]);
    const [originSuppliers, setOriginSuppliers] = useState([]);
    const [selectedSupplier,setSelectedSupplier] = useState([])
    const searchName = useRef('');
    const navigate = useNavigate();
    const [showSelectModel, setShowSelectModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let name = searchName.current.value;
                const list = await searchSuppliersByName(name);
                setSuppliersList(list);
                setOriginSuppliers(list);
            } catch (error) {
                
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originSuppliers.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setSuppliersList(filteredProducts);
    };

    const handelSelectSupplier = (supplier) =>{
        setSelectedSupplier(supplier);
        setShowSelectModal(true);
    }

    const handleConfirmSelect = () => {
        navigate(`/AddStock`, {
            state: {
                ...location.state,
                nameSupplierSelected: selectedSupplier.name,
                
            }
        });
        setShowSelectModal(false);
    };

    const handleClose = () => {
        setShowSelectModal(false);
    };

    
    return (
        <div style={{ border: "2px solid #ebedee", borderRadius: "8px", padding: "20px", maxWidth: "1000px", margin: "20px auto", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <h4 style={{ textAlign: "center", color: "#333" }}>DANH SÁCH NHÀ CUNG CẤP</h4>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <input ref={searchName} placeholder="Enter name product" className="form-control d-inline-block w-50" />
                <button type="button" onClick={handleSearch} className="btn btn-success" style={{ marginLeft: "10px" }}>Search</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>STT</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Chọn</th>
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
                            <button onClick={() => handelSelectSupplier(e)} className="btn btn-sm btn-custom"><i className="fa-solid fa-square-check"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showSelectModel} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có muốn chọn nhà cung cấp này không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Thoát
                        </Button>
                        <Button variant="success" onClick={handleConfirmSelect}>
                        Chọn
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SuppliersStock;