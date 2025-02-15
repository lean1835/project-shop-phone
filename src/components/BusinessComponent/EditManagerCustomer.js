import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik";
import { getCustomerById, updateCustomer } from "../../services/customerService";
import * as Yup from 'yup';
import { toast } from "react-toastify";
function EditManagerCustomer (){
    const {id}=useParams();
    const [customer,setCustomer]=useState(null);
    const navigate=useNavigate();;
    useEffect(()=>{
        const fetchCustomer= async()=>{
            let customer= await getCustomerById(id);
            setCustomer(customer);          
        }
        fetchCustomer();
    },[])
    const handleSubmit = async (value) => {
        const customer={
            ...value
        }
        await updateCustomer(id,customer);
        toast.success("Chỉnh sửa thành công");
        navigate('/home/manager/customer');
    }
    const handleValidate = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        phone: Yup.number().required("Vui lòng nhập số điện thoại"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        age: Yup.number().required("Vui lòng nhập tuổi"),
        email: Yup.string().required("Vui lòng nhập email")
        })
        

        if(customer==null){
            return "";
        } 
        const handleOut=()=>{
            navigate('/home/manager/customer')
        }         
    return(
        <>
            <div className="manager_retail">              
                {/* <Formik initialValues={product} onSubmit={handleSubmit} validationSchema={handleValidate} > */}
                <Formik initialValues={customer} onSubmit={handleSubmit} validationSchema={handleValidate}>
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
                            <button className="btn btn-success" type={'submit'}>OK</button>
                            <button><Link to={'/home/manager/customer'}>Thoát</Link></button>
                    </Form>
                </Formik>
                {/* <button onClick={handleOut}>Thoát</button> */}
            </div>
        </>
    );
}
export default EditManagerCustomer;