import React, {useState} from 'react';
import {addNewCustomer} from "../../services/customerService";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

function AddNewCustomer() {
    const [newCustomer] = useState({
        name: "",
        phone: useLocation().state?.phone || "",
        address: "",
        age: "",
        email: ""
    });

    const navigate = useNavigate();
    const handleSubmit = async (value) => {
        await addNewCustomer(value);
        navigate('/SaleManager', { state: { phone: value.phone } });
    }
    const handleBack = () => {
        navigate('/SaleManager');
    }
    const handleValidate = Yup.object({
        name: Yup.string().required("Name is required"),
        phone: Yup.string().matches(/^\d{10}$/, "Phone must be exactly 10 digits").required("Phone is required"),
        address: Yup.string().required("Address is required"),
        age: Yup.number().min(6, "Age must be at least 6").required("Age is required"),
        email: Yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid").required("Email is required")
    });
    return (
        <>
            <Formik initialValues={newCustomer} onSubmit={handleSubmit} validationSchema={handleValidate}>
                <Form>
                    <div>
                        <label>Name</label>
                        <Field name="name" type="text"/>
                        <ErrorMessage name="name"/>
                    </div>
                    <div>
                        <label>Phone</label>
                        <Field name="phone" type="tel"/>
                        <ErrorMessage name="phone"/>
                    </div>
                    <div>
                        <label>Address</label>
                        <Field name="address" type="text"/>
                        <ErrorMessage name="address"/>
                    </div>
                    <div>
                        <label>Age</label>
                        <Field name="age" type="number"/>
                        <ErrorMessage name="age"/>
                    </div>
                    <div>
                        <label>Email</label>
                        <Field name="email" type="email"/>
                        <ErrorMessage name="email"/>
                    </div>
                    <div>
                        <button type="submit">Add New Customer</button>
                        <button type="button" onClick={handleBack} >Back</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default AddNewCustomer;