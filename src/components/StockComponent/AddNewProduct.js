import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewProduct } from "../../services/productService";

function AddNewProduct() {
  const [newAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    screen_size: "",
    camera: "",
    selfie: "",
    cpu: "",
    storage: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    await addNewProduct(value);
    toast.success("Thêm mới thành công");
    navigate("/AddStock");
  };

  return (
    <div
      style={{
        border: "2px solid #ebedee",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "700px",
        margin: "20px auto",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4 style={{ textAlign: "center", color: "#333" }}>THÊM SẢN PHẨM MỚI</h4>
      <Formik initialValues={newAddProduct} onSubmit={handleSubmit}>
        <Form>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Tên sản phẩm</label>
              <Field
                className="form-control"
                type="text"
                name="name"
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div className="col">
              <label className="form-label">Giá</label>
              <Field
                className="form-control"
                type="text"
                name="price"
                placeholder="Nhập giá sản phẩm"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Hình ảnh</label>
              <Field
                className="form-control"
                type="text"
                name="image"
                placeholder="URL hình ảnh"
              />
            </div>
            <div className="col">
              <label className="form-label">Màn hình</label>
              <Field
                className="form-control"
                type="text"
                name="screen_size"
                placeholder="Nhập thông tin"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Camera</label>
              <Field
                className="form-control"
                type="text"
                name="camera"
                placeholder="Nhập thông tin"
              />
            </div>
            <div className="col">
              <label className="form-label">Selfie</label>
              <Field
                className="form-control"
                type="text"
                name="selfie"
                placeholder="Nhập thông tin"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">CPU</label>
              <Field
                className="form-control"
                type="text"
                name="cpu"
                placeholder="Nhập thông tin"
              />
            </div>
            <div className="col">
              <label className="form-label">Lưu trữ</label>
              <Field
                className="form-control"
                type="text"
                name="storage"
                placeholder="Nhập thông tin"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <Field
              className="form-control"
              type="text"
              name="description"
              placeholder="Nhập thông tin"
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-success me-2">
              Thêm
            </button>
            <Link to={"/Liststock"} type="button" className="btn btn-secondary">
              Hủy
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AddNewProduct;
