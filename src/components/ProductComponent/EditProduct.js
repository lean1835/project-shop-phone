import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProduct = ({ show, onClose, productId, onUpdate }) => {
  const [product, setProduct] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false); // Tránh submit nhiều lần

  // Lấy dữ liệu sản phẩm từ API khi mở modal
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:8080/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu sản phẩm:", error));
    }
  }, [productId]);

  // Cập nhật dữ liệu khi nhập vào input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Xử lý cập nhật sản phẩm
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!product.name || !product.price || !product.image || !product.screen_size || !product.camera || !product.selfie || !product.cpu || !product.storage || !product.description) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật sản phẩm.");
      }

      onUpdate(product); // Cập nhật dữ liệu trên giao diện
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chỉnh sửa sản phẩm</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Tên sản phẩm</label>
                <input type="text" className="form-control mb-2" name="name" value={product.name} onChange={handleChange} placeholder="Nhập tên sản phẩm" />

                <label className="form-label">Giá</label>
                <input type="number" className="form-control mb-2" name="price" value={product.price} onChange={handleChange} placeholder="Nhập giá sản phẩm" />

                <label className="form-label">Màn hình</label>
                <input type="text" className="form-control mb-2" name="screen_size" value={product.screen_size} onChange={handleChange} placeholder="Nhập kích thước màn hình" />

                <label className="form-label">Camera</label>
                <input type="text" className="form-control mb-2" name="camera" value={product.camera} onChange={handleChange} placeholder="Nhập thông số camera" />

                <label className="form-label">Selfie</label>
                <input type="text" className="form-control mb-2" name="selfie" value={product.selfie} onChange={handleChange} placeholder="Nhập thông số camera selfie" />
              </div>

              <div className="col-md-6">
                <label className="form-label">CPU</label>
                <input type="text" className="form-control mb-2" name="cpu" value={product.cpu} onChange={handleChange} placeholder="Nhập loại CPU" />

                <label className="form-label">Lưu trữ</label>
                <input type="text" className="form-control mb-2" name="storage" value={product.storage} onChange={handleChange} placeholder="Nhập dung lượng lưu trữ" />

                <label className="form-label">Mô tả sản phẩm</label>
                <textarea className="form-control mb-2" name="description" value={product.description} onChange={handleChange} placeholder="Nhập mô tả sản phẩm"></textarea>

                <label className="form-label">Hình ảnh (URL)</label>
                <input type="text" className="form-control mb-2" name="image" value={product.image} onChange={handleChange} placeholder="Nhập URL hình ảnh" />

                {product.image && (
                  <div className="text-center">
                    <img src={product.image} alt="Ảnh sản phẩm" className="img-thumbnail mt-2" style={{ maxWidth: "150px" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
