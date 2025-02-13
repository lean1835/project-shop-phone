import React, { useState } from 'react';
import { addNewCustomer } from "../../services/customerService";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../assets/saleComp.css';
import HeaderComponent from "../HomeComponent/HeaderComponent";

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
            <HeaderComponent/>
            <Formik initialValues={newCustomer} onSubmit={handleSubmit} validationSchema={handleValidate}>
                <Form className="add-customer-container">
                    <div className="form-group">
                        <label>Name</label>
                        <Field name="name" type="text" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <Field name="phone" type="tel" className="form-control" disabled/>
                        <ErrorMessage name="phone" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <Field name="address" type="text" className="form-control"/>
                        <ErrorMessage name="address" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <Field name="age" type="number" className="form-control"/>
                        <ErrorMessage name="age" component="div" className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" type="email" className="form-control"/>
                        <ErrorMessage name="email" component="div" className="error-message"/>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Add New Customer</button>
                        <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default AddNewCustomer;