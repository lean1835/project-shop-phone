import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchProductByName } from "../../services/productService";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { formarCurrency } from "../../utils/common";
import '../../assets/saleComp.css';

function SearchProduct() {
    const [originProducts, setOriginProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const searchName = useRef("");
    const navigate = useNavigate();
    const [selectedProducts, setSelectedProducts] = useState({});
    const [quantities, setQuantities] = useState({});
    const [selectedProductNames, setSelectedProductNames] = useState("");
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const phone = useLocation().state?.phone;

    useEffect(() => {
        const fetchData = async () => {
            let name = searchName.current.value;
            const data = await searchProductByName(name);
            setProducts(data);
            setOriginProducts(data);
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originProducts.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setProducts(filteredProducts);
    }

    const handleCheckboxChange = (productId) => {
        setSelectedProducts(prevState => {
            const newSelectedProducts = {
                ...prevState,
                [productId]: !prevState[productId]
            };
            if (newSelectedProducts[productId] && !quantities[productId]) {
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [productId]: 1
                }));
            }
            return newSelectedProducts;
        });
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities(prevState => ({
            ...prevState,
            [productId]: quantity
        }));
    };

    const totalAndSelectedProductNames = useCallback(
        () => {
            let total = 0;
            let names = "";
            for (let id in selectedProducts) {
                if (selectedProducts[id]) {
                    let product = originProducts.find(p => p.id === parseInt(id));
                    if (product) {
                        let quantity = quantities[id];
                        total += product.price * quantity;
                        names += product.name + ", ";
                    }
                }
            }
            setTotal(total);
            setSelectedProductNames(names.slice(0, -2));
            setIsModalOpen(true);
        },
        [selectedProducts, originProducts, quantities],
    );

    const handleConfirm = () => {
        navigate('/SaleManager', {
            state: {
                selectedProducts: selectedProductNames,
                total: total,
                phone: phone
            },
        });
    };

    return (
        <div className="search-product-container">
            <input ref={searchName} name="searchName" placeholder="Enter name product" className="form-control"/>
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th>Id</th>
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
                    <th>Purchase quantity</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{formarCurrency(p.price)}</td>
                        <td>
                            <img src={p.image} alt={p.name} className="product-image"/>
                        </td>
                        <td>{p.screen_size}</td>
                        <td>{p.camera}</td>
                        <td>{p.selfie}</td>
                        <td>{p.cpu}</td>
                        <td>{p.storage}</td>
                        <td>{p.description}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={!!selectedProducts[p.id]}
                                onChange={() => handleCheckboxChange(p.id)}
                                className="form-check-input"
                            />
                        </td>
                        <td>
                            {selectedProducts[p.id] && (
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[p.id] || 1}
                                    onChange={(e) => handleQuantityChange(p.id, parseInt(e.target.value))}
                                    className="form-control"
                                />
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="form-actions">
                <button onClick={() => navigate('/SaleManager')} className="btn btn-secondary">Back</button>
                <button onClick={() => totalAndSelectedProductNames()} className="btn btn-primary">Calculate All Selected Product</button>
            </div>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Selected Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Selected Products: {selectedProductNames}</p>
                    <p>Total: {formarCurrency(total)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SearchProduct;