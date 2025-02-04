import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
function ManagerCustomer (){

    return(
        <>
            <div className="manager_customer">
                <form >
                    <br/>
                    <span>Tìm kiếm theo:  </span> 
                    <select  className={'w-17'}>
                        <option value={""}>Tìm kiếm theo tên</option>
                        {/* {manufactureList.map(e=>(
                            <option value={e.id}>{e.name}</option>
                        ))} */}
                    </select>                    
                    <input className={'w-10'}  name={'searchName'} placeholder={'áo'}/> 
                    {/* <input className={'w-25'} ref={searchRef} name={'searchName'} placeholder={'Enter search name'}/> */}
                    <button className={' w-10 btn btn-success btn-sm'} type={'button'} ><i class="fa-solid fa-magnifying-glass"></i></button>
                    {/* <button onClick={handleSearch} className={' w-25 btn btn-success btn-sm'} type={'button'} >Search</button> */}
                </form>
                <table className={'table table-dark'}>
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Tuổi </th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {/* {productList.map((p,i)=>(
                    <tr key={p.id}>
                        <td>{i+1}</td>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.sim}</td>
                        <td>{p.feature}</td>
                        <td>{p.manufacture.name}</td>

                    </tr>
                ))} */}

                </tbody>
            </table>
                <button>
                    <Link to={'/home/manager/customer/edit'}>Chỉnh sửa</Link>
                </button>
                
                <button>Thoát</button>

            </div>
        </>
    );
}
export default ManagerCustomer;