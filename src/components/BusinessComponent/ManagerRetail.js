import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik";
function ManagerRetail (){
    return(
        <>
            <div className="manager_retail">
                <button >
                    <Link className="button_choice_product" to={'/retail/product'}>Chọn sản phẩm</Link>      
                </button>
                
                {/* <Formik initialValues={product} onSubmit={handleSubmit} validationSchema={handleValidate} > */}
                <Formik  >
                    <Form>{/* from thông tin */}
                        <div className="info_product">
                            <h5>Thông tin sản phẩm</h5>
                            <div> 
                                <label >Tên sản phẩm:</label>
                                <Field  type='text' name='name'/>
                                <ErrorMessage name='name' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Giá:</label>
                                <Field  type='number' name='price'/>
                                <ErrorMessage name='price' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Kích thước màn hình:</label>
                                <Field  type='number' name='screen_size'/>
                                <ErrorMessage name='screen_size' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Camera:</label>
                                <Field  type='number' name='camera'/>
                                <ErrorMessage name='title' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Selfie:</label>
                                <Field  type='number' name='selfie'/>
                                <ErrorMessage name='selfie' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Cpu:</label>
                                <Field  type='text' name='cpu'/>
                                <ErrorMessage name='cpu' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Dung lượng:</label>
                                <Field  type='number' name='storage'/>
                                <ErrorMessage name='storage' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Mô tả:</label>
                                <Field  type='text' name='description'/>
                                <ErrorMessage name='description' style={{color: 'red'}} component='div'/>
                            </div><br/>
                        </div>
                        {/* Nhập giá */}
                        <div> 
                                <label >Nhập giá bán lẻ:</label>
                                <Field  type='number' name='title'/>
                                <ErrorMessage name='title' style={{color: 'red'}} component='div'/>
                            </div><br/>
                        {/* Lựa chọn */}
                        <div>
                            <button className="btn btn-success" type={'submit'}>Cập nhật giá bán lẻ</button>
                            <button className="btn btn-info" >Thoát</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}
export default ManagerRetail;