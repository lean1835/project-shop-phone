import React, { useEffect, useRef, useState } from "react";
import { searchProductByName } from "../../services/productService";
import { Link } from "react-router-dom";

function ProductsInStock() {
    const [productList, setProductList] = useState([]);
    const [originProducts, setOriginProducts] = useState([]);
    const searchName = useRef('');

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

    const handleSelect = (product) =>{
        localStorage.setItem('selectedProduct', JSON.stringify(product));
    }
    return (
        <div style={{ border: "2px solid #007bff", borderRadius: "8px", padding: "20px", maxWidth: "1000px", margin: "20px auto", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <h4 style={{ textAlign: "center", color: "#007bff" }}>Chọn sản phẩm</h4>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <input ref={searchName} placeholder="Enter name product" className="form-control d-inline-block w-50" />
                <button type="button" onClick={handleSearch} className="btn btn-primary" style={{ marginLeft: "10px" }}>Search</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Screen size</th>
                        <th>Camera</th>
                        <th>Selfie</th>
                        <th>Chip</th>
                        <th>RAM</th>
                        <th>Description</th>
                        <th>Select</th>
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
                                <Link onClick={() => handleSelect(e)} to={"/ImportStock"} className="btn btn-info">Select</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsInStock;