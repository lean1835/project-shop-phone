import React, {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik";
function EditManagerCustomer (){
    return(
        <>
            <div className="manager_retail">
                <button >
   
                </button>
                
                {/* <Formik initialValues={product} onSubmit={handleSubmit} validationSchema={handleValidate} > */}
                <Formik  >
                    <Form>{/* from thông tin */}
                        <div className="info_product">
                            <h5>Chỉnh sửa thông tin khách hàng</h5>
                            <div> 
                                <label >Họ và tên</label>
                                <Field  type='text' name='name'/>
                                <ErrorMessage name='name' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Số điện thoại</label>
                                <Field  type='number' name='phone'/>
                                <ErrorMessage name='phone' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Địa chỉ</label>
                                <Field  type='text' name='address'/>
                                <ErrorMessage name='address' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Tuổi</label>
                                <Field  type='number' name='age'/>
                                <ErrorMessage name='age' style={{color: 'red'}} component='div'/>
                            </div><br/>
                            <div> 
                                <label >Email</label>
                                <Field  type='text' name='email'/>
                                <ErrorMessage name='email' style={{color: 'red'}} component='div'/>
                            </div><br/>
                        </div>
                        
                        <div>
                            <button className="btn btn-success" type={'submit'}>OK</button>
                            <button className="btn btn-info" >Cance</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}
export default EditManagerCustomer;