import React, {useCallback, useEffect, useRef, useState} from "react";
import {searchProductByName} from "../../services/productService";
import {useLocation, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
import {formarCurrency} from "../../utils/common";
import '../../assets/saleComp.css';
import HeaderComponent from "../HomeComponent/HeaderComponent";

function SearchProduct() {
    const [originProducts, setOriginProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const searchName = useRef("");
    const navigate = useNavigate();
    const originLocationState = JSON.parse(JSON.stringify(useLocation().state));
    const [selectedProducts, setSelectedProducts] = useState(useLocation().state?.selectedProducts || []);
    const [quantities, setQuantities] = useState(useLocation().state?.quantities || []);
    // const [quantities, setQuantities] = useState([]);
    const [selectedProductNames, setSelectedProductNames] = useState(useLocation().state?.selectedProductNames || "");
    const [total, setTotal] = useState(useLocation().state?.total || 0);
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
        console.log('vo day 1 lan');
    }, []);

    const handleSearch = () => {
        const text = searchName.current.value;
        const filteredProducts = originProducts.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
        setProducts(filteredProducts);
    }

    const handleCheckboxChange = useCallback((productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
            const newQuantities = quantities.filter(q => q.productId !== productId);
            setQuantities(newQuantities);
        } else {
            setSelectedProducts([...selectedProducts, productId]);
            setQuantities([...quantities, {productId, quantity: 1}]);
        }
    }, [products, selectedProducts, quantities]);

    const handleQuantityChange = useCallback((productId, quantity) => {
        const newQuantities = quantities.map(q => q.productId === productId ? {...q, quantity} : q);
        setQuantities(newQuantities);
    }, [quantities, selectedProducts]);

    const totalAndSelectedProductNames = useCallback(
        () => {
            let total = 0;
            let names = "";

            const allSelectedProducts = originProducts.filter(p => selectedProducts.includes(p.id));

            for (let i = 0; i < allSelectedProducts.length; i++) {
                const product = allSelectedProducts[i];
                const quantity = quantities.find(q => q.productId === product.id)?.quantity || 1;
                total += product.price * quantity;
                names += product.name + ", ";
            }

            setTotal(total);
            setSelectedProductNames(names.slice(0, -2));
            setIsModalOpen(true);
        },
        [selectedProducts, originProducts, quantities],
    );

    const handleConfirm = useCallback(() => {
        navigate('/SaleManager', {
            state: {
                selectedProductNames,
                selectedProducts: products.filter(p => selectedProducts.includes(p.id)),
                total,
                phone,
                quantities,
            },
        });
    }, [products, selectedProductNames, selectedProducts, total, phone, quantities]);

    const handleBack = useCallback(() => {
        console.log('originLocationState: ', originLocationState);
        navigate('/SaleManager', {
            state: {
                ...originLocationState,
                selectedProducts: products.filter(p => originLocationState.selectedProducts.includes(p.id)),
            }
        });
    }, [originLocationState, selectedProducts, products]);

    console.log('selectedProducts: ', selectedProducts);
    console.log('quantities: ', quantities);
    console.log('originLocationState: ', originLocationState);

    return (
        <>
            <HeaderComponent/>
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
                                    checked={selectedProducts.includes(p.id)}
                                    onChange={() => handleCheckboxChange(p.id)}
                                    className="form-check-input"
                                />
                            </td>
                            <td>
                                {selectedProducts.includes(p.id) && (
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities.find(q => q.productId === p.id)?.quantity || 1}
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
                    <button onClick={handleBack} className="btn btn-secondary">Back</button>
                    <button onClick={() => totalAndSelectedProductNames()} className="btn btn-primary">Calculate All
                        Selected Product
                    </button>
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
        </>
    );
}

export default SearchProduct;