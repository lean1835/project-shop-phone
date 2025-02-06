import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { getAllProducts } from "../../services/productService";
function ChoiceProduct (){
    const [productList , setProductList] = useState([]);
    useEffect(()=>{
        const fetchData= async()=>{
                        const products= await getAllProducts();
                        setProductList(products);
                    }
                    fetchData();
                },[])
    return(
        <>

            <div className="choice_product">
                <span>Hiển thị:</span>
                <input type="radio" name="display" value={'all'}/>Tất cả sản phẩm <br/>
                <input type="radio" name="display" value={'no_price'}/>Các mặt hàng chưa có giá
                <form >

                    {/* <select ref={searchManufactureIdRef} className={'w-25'}> */}
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
                    <button className={' w-10 btn btn-success btn-sm'} type={'button'} >Tìm kiếm</button>
                    {/* <button onClick={handleSearch} className={' w-25 btn btn-success btn-sm'} type={'button'} >Search</button> */}
                </form>
                <table className={'table table-light'}>
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Kích thước màn</th>
                    <th>Độ phân giải</th>
                    <th>Cpu</th>
                    <th>Dung lượng</th>
                </tr>
                </thead>
                <tbody>
                {productList.map((p,i)=>(
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.screen_size}</td>
                        <td>{p.camera}/{p.selfie}</td>
                        <td>{p.cpu}</td>
                        <td>{p.storage}</td>

                    </tr>
                ))}

                </tbody>
            </table>
                <button>Chọn</button>
                <button>Thoát</button>

            </div>
        </>
    );
}
export default ChoiceProduct;