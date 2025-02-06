import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function AddStock() {
  const [newStock, setNewStock] = useState({
    name: "",
    price: "",
    image: "",
    quantity: "",
  });
  
    useEffect(() => {
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (selectedProduct) {
            setNewStock({
                name: selectedProduct.name,
                price: selectedProduct.price,
                image: selectedProduct.image,
                quantity: "", // có thể để trống hoặc gán giá trị mặc định
            });
        }
    }, []);
  return (
    <div style={{ 
        border: "2px solid #007bff", 
        borderRadius: "8px", 
        padding: "20px", 
        maxWidth: "700px", 
        margin: "20px auto", 
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
        backgroundColor: "#f9f9f9"
      }}>
      <h4 style={{ textAlign: "center", color: "#007bff" }}>Nhập kho</h4>
      <Link className="btn btn-secondary" to={"/ProductsInStock"} style={{ marginBottom: "15px", display: "block", textAlign: "center" }}>
        Chọn hàng hóa đã từng nhập kho
      </Link>
      <Formik>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên sản phẩm</label>
              <Field className="form-control" type="text" name="name" placeholder="Nhập tên sản phẩm" value={newStock.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Giá</label>
              <Field className="form-control" type="text" name="price" placeholder="Nhập giá sản phẩm" value={newStock.price} readOnly/>
            </div>
            <div className="mb-3">
              <label className="form-label">Hình ảnh hàng hóa</label>
              <Field className="form-control" type="text" name="image" placeholder="URL hình ảnh" value={newStock.image} readOnly/>
            </div>
            <div className="mb-3">
              <label className="form-label">Số lượng nhập</label>
              <Field className="form-control" type="text" name="quantity" placeholder="Nhập số lượng" />
            </div>
            <div className="mb-3 d-flex align-items-center">
            <div className="flex-grow-1">
              <label className="form-label">Nhà cung cấp</label>
              <Field className="form-control" type="text" name="supplier" placeholder="Nhập tên nhà cung cấp" />
            </div>
            <Link to={"/SuppliersStock"} className="btn btn-secondary ms-2" style={{ height: "38px", padding: "0 10px", display: "flex", alignItems: "center" , marginTop:"30px"}}>Chọn NCC</Link>
            </div>
            <div style={{ textAlign: "center" }}>
              <button type="submit" className='btn btn-success me-2'>Thêm vào kho</button>
              <Link to={"/Liststock"} type="button" className='btn btn-secondary'>Hủy</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddStock;