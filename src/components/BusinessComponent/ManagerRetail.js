import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'

function ManagerRetail (){
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
                                <label >Tên sản phẩm:</label>

                            </div><br/>
                            <div> 
                                <label >Giá:</label>

                            </div><br/>
                            <div> 
                                <label >Kích thước màn hình:</label>

                            </div><br/>
                            <div> 
                                <label >Camera:</label>

                            </div><br/>
                            <div> 
                                <label >Selfie:</label>

                            </div><br/>
                            <div> 
                                <label >Cpu:</label>

                            </div><br/>
                            <div> 
                                <label >Dung lượng:</label>

                            </div><br/>
                            <div> 
                                <label >Mô tả:</label>
                            </div><br/>
                        </div><hr/>
                        {/* Nhập giá */}
                        <div> 
                                <label >Nhập giá bán lẻ:</label>
                                <input type="number" placeholder="Nhap gia"/>
                            </div><br/>
                        {/* Lựa chọn */}<hr/>
                        <div>
                            <button className="btn btn-success" >Cập nhật giá bán lẻ</button>
                            <button className="btn btn-info" >Thoát</button>
                        </div><hr/>
            </div>
        </>
    );
}
export default ManagerRetail;