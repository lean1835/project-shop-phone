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
    useEffect(() => {
        if (!account) {
            const storedAccount = JSON.parse(localStorage.getItem('account'));
            if (storedAccount) {
                dispatch({
                    type: "LOGIN",
                    payload: storedAccount
                });
            }
        }
    }, [account, dispatch]);
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">An Shop</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            {account && (
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Quản lý
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
                                            <li><Link className="dropdown-item" >Quản lý kinh doanh</Link></li>
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
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <form class="d-flex mx-auto" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <li class="nav-item dropdown" style={{ listStyleType: 'none' }}>
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src='/login.png' style={{height:'50px',width:'50px',borderRadius:'50%'}}/>
                            </a>
                            <ul className="dropdown-menu">
                                <li class="nav-item">
                                    <a>Tài khoản: </a> {account && account.username}
                                </li>
                                <li class="nav-item">
                                    <a>Loại tài khoản: </a> {account && account.role}
                                </li>
                                <li className="nav-item">
                                    {account && <button onClick={handleLogout}>Logout</button>}
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default HeaderComponent;