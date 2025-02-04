import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderComponent.css'
import { logout } from '../../redux/accountUser';

function HeaderComponent() {
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-red">
                <div class='logo-header'>
                    <Link><img class='image' src='logo.png' /></Link>
                    <a class="navbar-brand" href="#" >An Shop</a>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        {account && (
                            <li class="nav-item dropdown">
                                <a style={{ color: 'white' }} class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh mục quản lý
                                </a>

                                <ul className="dropdown-menu">
                                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Sales Staff" || account.role === "Warehouse Staff") && (
                                        <li><Link className="dropdown-item">Quản lý thông tin cá nhân</Link></li>
                                    )}
                                    {account.role === "Admin" && (
                                        <li><Link className="dropdown-item" >Quản lý nhân viên</Link></li>
                                    )}
                                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Sales Staff") && (
                                        <li><Link className="dropdown-item" >Quản lý bán hàng</Link></li>
                                    )}
                                    {(account.role === "Admin" || account.role === "Business Staff") && (
                                        <li><Link to={'/home/manager'} >Quản lý kinh doanh</Link></li>
                                    )}
                                    {(account.role === "Admin" || account.role === "Business Staff") && (
                                        <li><Link className="dropdown-item" >Quản lý báo cáo</Link></li>
                                    )}
                                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Sales Staff") && (
                                        <li><Link className="dropdown-item" >Xem thông tin hàng hóa</Link></li>
                                    )}
                                    {(account.role === "Admin" || account.role === "Business Staff" || account.role === "Warehouse Staff") && (
                                        <li><Link className="dropdown-item" >Quản lý nhà cung cấp</Link></li>
                                    )}
                                    {(account.role === "Admin" || account.role === "Sales Staff" || account.role === "Warehouse Staff") && (
                                        <li><Link className="dropdown-item" to="/warehouse">Quản lý nhập kho</Link></li>
                                    )}
                                </ul>
                            </li>
                        )}
                    </ul>
                    <form class="d-flex" role="search">
                        <div class='search-container'>
                            <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search" style={{ border: 'none' }} />
                            <button className="search-btn">
                                <i className="material-icons" style={{ fontSize: '25px', marginTop: '5px' }}>search</i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="header-left">
                    {account ? (<li class="nav-item dropdown" style={{ listStyleType: 'none' }}>
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src='/login.png' style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li class="nav-item">
                                <a>Tài khoản: </a> {account && account.username}
                            </li>
                            <li class="nav-item">
                                <a>Loại tài khoản: </a> {account && account.role}
                            </li>
                            <li className="nav-item">
                                {account && <button onClick={handleLogout} class='logout'>Logout</button>}
                            </li>
                        </ul>
                    </li>
                    ) : (
                        <li class="nav-item" style={{ listStyleType: 'none' }}>
                            <button onClick={() => navigate('/')} className="btn btn-primary">Login</button>
                        </li>
                    )}
                    <div class="shopping-cart">
                        <i className="material-icons">shopping_cart</i>
                        <a style={{ fontSize: '20px', marginLeft: '5px' }} >Giỏ hàng</a>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default HeaderComponent;