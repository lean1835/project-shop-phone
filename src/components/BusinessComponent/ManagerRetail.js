import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import { getProductById, updateProduct } from "../../services/productService";
import { toast } from "react-toastify";

function ManagerRetail (){
    const {id}=useParams();
    const [oneProduct,setOneProduct]=useState({id:' ',name:" ",price:' ',image:' ',screen_size:' ',camera:' ',selfie:' ',cpu:' ',storage:' ',description:' '})
    const priceRef=useRef();
    const navigate=useNavigate();
        useEffect(()=>{ 
        if(id!=null){
            const fetchData=async ()=>{
                const product= await getProductById(id);
                setOneProduct(product);
            }
            fetchData();   
        } 
    },[])
    const handleSubmit = async () => {
        const newPrice= priceRef.current.value;
        console.log(newPrice)
        if(id!=null&&newPrice!=''){
            // const newPrice= priceRef.current.value;
            const product = {
                ...oneProduct,
                price: newPrice
            }
            await updateProduct(id,product);
            toast.success("Cập nhật giá thành công");
            navigate('/home/manager')
        }else{
            toast.error("Cập nhật giá thất bại");
        }         
        }    
    const handleOut=()=>{
        navigate('/home/manager')
    }
    return(
        <>
            <div className="manager_retail">
                <button >
                    <Link className="button_choice_product" to={'/home/manager/retail/product'}>Chọn sản phẩm</Link>      
                </button>
                
                {/* <Formik initialValues={product} onSubmit={handleSubmit} validationSchema={handleValidate} > */}
                {/* <Formik  >
                    <Form>from thông tin */}
                        <div className="info_product">
                            <hr/>
                            <h5>Thông tin sản phẩm</h5>
                            <div> 
                                <label >Tên sản phẩm:   </label>
                                <span> {oneProduct.name}</span>
                            </div><br/>
                            <div> 
                                <label >Giá:</label>
                                <span> {oneProduct.price}</span>
                            </div><br/>
                            <div> 
                                <label >Kích thước màn hình:</label>
                                <span> {oneProduct.screen_size}</span>
                            </div><br/>
                            <div> 
                                <label >Camera:</label>
                                <span> {oneProduct.camera}</span>
                            </div><br/>
                            <div> 
                                <label >Selfie:</label>
                                <span> {oneProduct.selfie}</span>
                            </div><br/>
                            <div> 
                                <label >Cpu:</label>
                                <span> {oneProduct.cpu}</span>
                            </div><br/>
                            <div> 
                                <label >Dung lượng:</label>
                                <span> {oneProduct.storage}</span>
                            </div><br/>
                            <div> 
                                <label >Mô tả:</label>
                                <span> {oneProduct.description}</span>
                            </div><br/>
                        </div><hr/>
                        {/* Nhập giá */}
                        <div> 
                                <label >Nhập giá bán lẻ:</label>
                                <input type="number" name="price" ref={priceRef} placeholder="Nhap gia"/>
                            </div><br/>
                        {/* Lựa chọn */}<hr/>
                        <div>
                            <button className="btn btn-success" onClick={handleSubmit} >Cập nhật giá bán lẻ</button>
                            <button className="btn btn-info" onClick={handleOut} >Thoát</button>
                        </div><hr/>
            </div>
        </>
    );
}
export default ManagerRetail;