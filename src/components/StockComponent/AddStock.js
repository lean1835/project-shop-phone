import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AddStock.css";
import { addNewStock } from "../../services/stockService";
import { toast } from "react-toastify";

function AddStock() {
  const location = useLocation();
  const [newStock, setNewStock] = useState({
    id: location.state?.id || "",
    name: location.state?.nameSelected || "",
    image: location.state?.imageSelected || "",
    importPrice: "",
    quantity: "",
    supplier: { name: "" },
  });

  const [newSupplier, setNewSupplier] = useState({
    nameSupplier: location.state?.nameSupplierSelected || "",
  });

  const [newAddStock, setNewAddStock] = useState({
    productId: "",
    supplierId: "",
    quantity: "",
    importPrice: "",
    importDate: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const stockData = {
      productId: location.state?.id || newStock.id,
      supplierId: location.state?.supplierIdSelected || "",
      quantity: Number(values.quantity),
      importPrice: Number(values.importPrice),
      importDate: values.importDate,
    };
    await addNewStock(stockData);
    toast.success("Thêm mới thành công");
    navigate("/ListStock");
  };

  const handleSupplier = () => {
    navigate("/AddStock/SuppliersStock", {
      state: {
        productId: newStock.id,
        nameSelected: newStock.name,
        imageSelected: newStock.image,
        supplier: newSupplier.nameSupplier,
      },
    });
  };

  useEffect(() => {
    if (location.state) {
      setNewStock((prev) => ({
        id: location.state.id || prev.id,
        name: location.state.nameSelected || prev.name,
        image: location.state.imageSelected || prev.image,
        importPrice: location.state.importPrice || prev.importPrice,
        quantity: location.state.quantity || prev.quantity,
      }));
      setNewSupplier({
        nameSupplier: location.state.nameSupplierSelected || "",
      });
    }
  }, [location.state]);

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
      <h4 style={{ textAlign: "center", color: "#333" }}>NHẬP KHO</h4>
      <div className="button-container">
        <Link className="btn btn-secondary" to="/AddStock/ProductsInStock">
          Chọn hàng hóa đã từng nhập kho
        </Link>
        <Link to={"/AddStock/AddNewProduct"} className="btn btn-secondary">
          Thêm sản phẩm mới
        </Link>
      </div>
      <Formik initialValues={newAddStock} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm</label>
            <Field
              className="form-control"
              type="text"
              name="productId"
              placeholder="Nhập tên sản phẩm"
              value={newStock.name}
              disabled
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <div className="flex-grow-1">
              <label className="form-label">Nhà cung cấp</label>
              <Field
                className="form-control"
                type="text"
                name="supplierId"
                placeholder="Nhập tên nhà cung cấp"
                value={newSupplier.nameSupplier}
                disabled
              />
            </div>
            <button
              type="button"
              onClick={handleSupplier}
              className="btn btn-secondary ms-2"
              style={{
                height: "38px",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              Chọn NCC
            </button>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Hình ảnh hàng hóa </label>
              {/* <Field className="form-control" type="text" name="image" placeholder="URL hình ảnh" value={newStock.image} disabled/> */}
              {newStock.image && (
                <img
                  src={newStock.image}
                  alt="Hàng hóa"
                  className="img-fluid"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              )}
            </div>
            <div className="col">
              <label className="form-label">Số lượng nhập</label>
              <Field
                className="form-control"
                type="text"
                name="quantity"
                placeholder="Nhập số lượng"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Giá</label>
              <Field
                className="form-control"
                type="text"
                name="importPrice"
                placeholder="Nhập giá sản phẩm"
              />
            </div>
            <div className="col">
              <label className="form-label">Ngày</label>
              <Field className="form-control" type="date" name="importDate" />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn me-2 btn-custom">
              Thêm vào kho
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

export default AddStock;
