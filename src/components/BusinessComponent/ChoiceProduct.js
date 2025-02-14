import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { searchByNameAndChoice} from "../../services/productService";
import './ChoiceProduct.css'
function ChoiceProduct (){
    const [productList , setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const nameSearchRef=useRef();
    const navigate=useNavigate();
    const choiceRef=useRef();
    const [choiceDisplay,setChoiceDisplay]=useState();
    const [isReload,setIsReload]=useState(false);
    useEffect(()=>{
        const fetchData= async()=>{
            const nameSearch=nameSearchRef.current.value;
            const products= await searchByNameAndChoice(nameSearch,choiceDisplay);
            setProductList(products);
        }
        fetchData();
        },[isReload])

    const handleRadioChange = (productId) => {
        setSelectedProduct(productId);
    };     
    const handleOut=()=>{
        navigate('/home/manager/retail')
    }   
    const handleSearch=()=>{
        setIsReload((pre)=>!pre);
    } 
    const handleChoice=(event)=>{
        setChoiceDisplay(event.target.value);
        setIsReload((pre)=>!pre);
    }   

    return(
        <>

            <div className="choice_product">
                <span >Hiển thị:</span>
                
                <input className="choice_display" type="radio" name="display" ref={choiceRef} onChange={handleChoice} value={"no_price"}/>Các mặt hàng chưa có giá<br/>
                <input className="choice_display" type="radio" name="display" ref={choiceRef} onChange={handleChoice}  value={"all"}/>Tất cả sản phẩm 
                <form >                 
                    <input className={'search_input'} ref={nameSearchRef} name={'nameSearch'} placeholder={'áo'}/> 
                    {/* <input className={'w-25'} ref={searchRef} name={'searchName'} placeholder={'Enter search name'}/> */}
                    <button className={' button_search'} onClick={handleSearch} type={'button'} >Tìm kiếm</button>
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
                    <th>Chọn</th>
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
                        <td>
                            <input
                                type="radio"
                                name="product"
                                checked={selectedProduct === p.id}
                                onChange={() => handleRadioChange(p.id)}
                                className="form-check-input"
                            />
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            {selectedProduct !== null && (
                <button 
                    className="button_choice_product" 
                    onClick={() => navigate(`/home/manager/retail/${selectedProduct}`)}>
                    Chọn
                </button>              
            )}
             
                <button className="button_exit" onClick={handleOut}>Thoát</button>

            </div>
        </>
    );
}
export default ChoiceProduct;