import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProductModal = ({ show, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    screen_size: "",
    camera: "",
    selfie: "",
    cpu: "",
    storage: "",
    description: ""
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.screen_size || !newProduct.camera || !newProduct.selfie || !newProduct.cpu || !newProduct.storage || !newProduct.description) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      return;
    }
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    }).then(response => response.json())
      .then(data => {
        onAdd(data);
        setNewProduct({ name: "", price: "", image: "", screen_size: "", camera: "", selfie: "", cpu: "", storage: "", description: "" });
      });
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thêm sản phẩm mới</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <input type="text" className="form-control mb-2" placeholder="Tên sản phẩm" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Giá" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Màn hình" value={newProduct.screen_size} onChange={(e) => setNewProduct({ ...newProduct, screen_size: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Camera" value={newProduct.camera} onChange={(e) => setNewProduct({ ...newProduct, camera: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Selfie" value={newProduct.selfie} onChange={(e) => setNewProduct({ ...newProduct, selfie: e.target.value })} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control mb-2" placeholder="CPU" value={newProduct.cpu} onChange={(e) => setNewProduct({ ...newProduct, cpu: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Lưu trữ" value={newProduct.storage} onChange={(e) => setNewProduct({ ...newProduct, storage: e.target.value })} />
                <textarea className="form-control mb-2" placeholder="Mô tả" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
                <input type="file" className="form-control mb-2" onChange={handleImageUpload} />
                {newProduct.image && <img src={newProduct.image} alt="Hình ảnh sản phẩm" className="img-thumbnail mb-2 w-100" />}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleSubmit}>Thêm</button>
            <button className="btn btn-secondary" onClick={onClose}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
