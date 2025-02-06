import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'

function Manager (){
    return(
        <>
            <div className="manager">
                <button >
                    <Link className="button_retail" to={'/home/manager/retail'}>Quản lý giá bán lẻ</Link>
                    
                </button>
                <button >
                   <Link className="button_customer" to={'/home/manager/customer'}>Quản lý khách hàng</Link>
                    
                </button>
            </div>
        </>
    );
}
export default Manager;