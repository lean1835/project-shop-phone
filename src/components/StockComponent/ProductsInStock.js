import React, { useEffect, useRef, useState } from "react";
import {searchProductByName } from "../../services/productService";
import {  useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import './StockCSS.css'


function ProductsInStock() {
    const [productList, setProductList] = useState([]);
    const [originProducts, setOriginProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState([])
    const searchName = useRef('');
    const navigate = useNavigate();
    const [showSelectModel, setShowSelectModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let name = searchName.current.value;
                const list = await searchProductByName(name);
                setProductList(list);
                setOriginProducts(list);
            } catch (error) {
                // Handle error here if needed
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originProducts.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setProductList(filteredProducts);
    };

    const handleSelect = (product) => {
        setSelectedProduct(product);
        setShowSelectModal(true);
    };

    const handleConfirmSelect = () => {
        navigate(`/AddStock`, {
            state: {
                idSelected: selectedProduct.id,
                nameSelected: selectedProduct.name,
                imageSelected: selectedProduct.image
            }
        });
        setShowSelectModal(false);
    };

    const handleClose = () => {
        setShowSelectModal(false);
    };


    return (
        <div style={{ border: "2px solid #ebedee", borderRadius: "8px", padding: "20px", maxWidth: "90%", margin: "20px auto", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <h4 style={{ textAlign: "center", color: "#333" }}>DANH SÁCH SẢN PHẨM</h4>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <input ref={searchName} placeholder="Nhập sản phẩm cần tìm" className="form-control d-inline-block w-50" />
                <button type="button" onClick={handleSearch} className="btn btn-success" style={{ marginLeft: "10px" }}>Search</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Hình ảnh</th>
                        <th>Màn hình</th>
                        <th>Camera</th>
                        <th>Selfie</th>
                        <th>CPU</th>
                        <th>Lưu trữ</th>
                        <th>Mô tả</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {productList && productList.map((e, i) => (
                        <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.price}</td>
                            <td><img src={e.image} alt={e.name} style={{ width: "50px", height: "auto" }} /></td>
                            <td>{e.screen_size}</td>
                            <td>{e.camera}</td>
                            <td>{e.selfie}</td>
                            <td>{e.cpu}</td>
                            <td>{e.storage}</td>
                            <td>{e.description}</td>
                            <td>
                                <button className="btn btn-sm btn-custom " onClick={() => handleSelect(e)} ><i className="fa-solid fa-square-check"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showSelectModel} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có muốn chọn sản phẩm này không?</Modal.Body>
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

export default ProductsInStock;