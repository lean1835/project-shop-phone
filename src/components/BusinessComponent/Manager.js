import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import './Manager.css'
function Manager (){
    const navigate=useNavigate();
    return(
        <>
<div className="menu">
<i className='huh_chu'>Quản lý kinh doanh</i>
            <div className="manager">
                
            <button className="button_retail" onClick={() => navigate('/home/manager/retail')}>
                Quản lý giá bán lẻ
            </button>
            <button className="button_customer" onClick={() => navigate('/home/manager/customer')}>
                Quản lý khách hàng
            </button>
                
            </div></div>
        </>
    );
}
export default Manager;