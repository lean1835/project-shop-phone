import React, { useEffect, useState } from 'react';
import './BodyComponent.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../services/productService';
function BodyComponent() {
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/');
    }
    const [productsList, setProductsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const feachData = async () => {
            const listProduct = await getAllProducts();
            setProductsList(listProduct)
        }
        feachData()
    }, [isLoading])
    const [visibleCount, setVisibleCount] = useState(5);
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Tăng số card hiển thị thêm 5
      };
        return (
            <>
                {account && (<div className='body'>
                    {account.role === "Admin" && (<div className='body-manage'>
                        <Link className='link' to={'/home/managerStaff'}><div className='body-card'>
                            <li>Quản lý nhân viên</li>
                            <img className='body-card-img' src='./management.png' />
                        </div></Link>
                    </div>
                    )}
                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Sales Staff") && (<div className='body-manage'>
                        <Link className="link" to="/saleManager"><div className='body-card'>
                            <li>Quản lý bán hàng</li>
                            <img className='body-card-img' src='./QlBanHang.png' />
                        </div></Link>
                    </div>
                    )}
                    {(account.role === "Admin" || account.role === "Business Staff") && (<div className='body-manage'>
                        <Link to={'/home/manager'} className="link" ><div className='body-card'>
                            <li>Quản lý kinh doanh</li>
                            <img className='body-card-img' src='./QlKinhDoanh.png' />
                        </div></Link>
                    </div>
                    )}
                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Sales Staff") && (<div className='body-manage'>
                        <Link to={'/home/productInfoPage'} className="link"><div className='body-card'>
                            <li>Xem thông tin hàng hóa</li>
                            <img className='body-card-img' src='./goods.png' />
                        </div></Link>
                    </div>
                    )}
                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Warehouse Staff") && (<div className='body-manage'>
                        <Link className="link"><div className='body-card'>
                            <li>Quản lý nhà cung cấp</li>
                            <img className='body-card-img' src='./supply-chain.png' />
                        </div></Link>
                    </div>
                    )}
                    {(account.role === "Admin" || account.role === "Sales Staff" || account.role === "Warehouse Staff") && (<div className='body-manage'>
                        <Link className="link" to="/liststock"><div className='body-card'>
                            <li>Quản lý nhập kho</li>
                            <img className='body-card-img' src='./warehouse.png' />
                        </div></Link>
                    </div>
                    )}
                </div>
                )}
                <div className='body-list'>
                    {productsList.slice(0, visibleCount).map((products, i) => (
                        <Link className='link'>
                            <div key={i} className="card" style={{ width: '16rem' }} >
                                <img src={products.image} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <p class="card-text">
                                        <strong>{parseInt(products.price).toLocaleString("vi-VN")} ₫</strong>
                                    </p>
                                    <h5>{products.name} {products.storage}</h5>
                                </div>
                            </div></Link>
                    ))}
                    {visibleCount < productsList.length && (
                        <button className="loading" onClick={loadMore} >
                            Xem thêm
                        </button>
                    )}
                </div>
            </>
        )
    }
    export default BodyComponent;